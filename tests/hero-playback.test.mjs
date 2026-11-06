import { test } from "node:test";
import assert from "node:assert/strict";
import { getApiBaseUrl, isLocalApiUrl } from "../src/config/api-url.js";
import { observeHeroEnvironment, shouldPlayHero, syncHeroPlayback } from "../src/component/healthkart/hero-playback.js";

test("LAN visitors use the storefront proxy for a locally configured backend", () => {
  for (const url of [undefined, "http://localhost:3005", "http://127.0.0.1:3005", "http://[::1]:3005"]) {
    assert.equal(getApiBaseUrl(url), "/api");
  }
  assert.equal(getApiBaseUrl("https://api.example.com/"), "https://api.example.com");
  assert.equal(getApiBaseUrl("/backend"), "/backend");
  assert.equal(isLocalApiUrl("https://localhost.example.com"), false);
});

test("multiple banners play normally, with explicit pause and reduced-motion support", () => {
  assert.equal(shouldPlayHero({ count: 3 }), true);
  assert.equal(shouldPlayHero({ count: 1, choice: true }), false);
  assert.equal(shouldPlayHero({ count: 3, choice: false }), false);
  assert.equal(shouldPlayHero({ count: 3, reducedMotion: true }), false);
  assert.equal(shouldPlayHero({ count: 3, reducedMotion: true, choice: true }), true);
  assert.equal(shouldPlayHero({ count: 3, hidden: true, choice: true }), false);
  assert.equal(shouldPlayHero({ count: 3, focused: true }), false);
});

test("a stopped or paused slider resumes without continually resetting a running timer", () => {
  const calls = [];
  const swiper = { autoplay: { running: false, paused: false,
    start() { calls.push("start"); this.running = true; },
    stop() { calls.push("stop"); this.running = false; },
    resume() { calls.push("resume"); this.paused = false; },
  } };
  syncHeroPlayback(swiper, true);
  syncHeroPlayback(swiper, true);
  swiper.autoplay.paused = true;
  syncHeroPlayback(swiper, true);
  syncHeroPlayback(swiper, false);
  syncHeroPlayback(swiper, true);
  assert.deepEqual(calls, ["start", "resume", "stop", "start"]);
  swiper.destroyed = true;
  syncHeroPlayback(swiper, false);
  assert.equal(calls.length, 4);
});

function environment(legacy = false) {
  const listeners = new Map();
  const preference = { matches: false };
  const listen = callback => listeners.set("motion", callback);
  const remove = () => listeners.delete("motion");
  if (legacy) { preference.addListener = listen; preference.removeListener = remove; }
  else { preference.addEventListener = (_, callback) => listen(callback); preference.removeEventListener = remove; }
  const browser = { matchMedia: () => preference };
  const page = { visibilityState: "visible", addEventListener: (_, callback) => listeners.set("visibility", callback), removeEventListener: () => listeners.delete("visibility") };
  return { browser, page, listeners, preference };
}

for (const legacy of [false, true]) {
  test(`playback tracks tab visibility and motion changes (${legacy ? "legacy" : "modern"} browser API)`, () => {
    const { browser, page, listeners, preference } = environment(legacy);
    const states = [];
    const cleanup = observeHeroEnvironment(state => states.push(state), browser, page);
    page.visibilityState = "hidden"; listeners.get("visibility")();
    page.visibilityState = "visible"; listeners.get("visibility")();
    preference.matches = true; listeners.get("motion")();
    preference.matches = false; listeners.get("motion")();
    assert.deepEqual(states.map(state => shouldPlayHero({ count: 3, ...state })), [true, false, true, false, true]);
    cleanup();
    assert.equal(listeners.size, 0);
  });
}

test("browsers without matchMedia still initialize playback", () => {
  let state;
  const cleanup = observeHeroEnvironment(value => { state = value; }, {}, { addEventListener() {}, removeEventListener() {} });
  assert.equal(shouldPlayHero({ count: 3, ...state }), true);
  cleanup();
});
