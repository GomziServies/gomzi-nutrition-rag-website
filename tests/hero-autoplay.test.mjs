import { test } from "node:test";
import assert from "node:assert/strict";
import { Autoplay } from "swiper/modules";

test("installed Swiper advances repeatedly without transitionend and does not pause on mouse hover", () => {
  const original = { setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout, requestAnimationFrame: globalThis.requestAnimationFrame, cancelAnimationFrame: globalThis.cancelAnimationFrame, Date: globalThis.Date };
  let now = 0;
  let id = 0;
  const timers = new Map();
  const events = new Map();
  const mouseListeners = [];
  const transitionListeners = [];
  globalThis.Date = class extends original.Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  };
  globalThis.setTimeout = (callback, delay) => { const key = ++id; timers.set(key, { callback, time: now + delay }); return key; };
  globalThis.clearTimeout = key => timers.delete(key);
  globalThis.requestAnimationFrame = () => ++id;
  globalThis.cancelAnimationFrame = () => {};
  const advance = duration => {
    const end = now + duration;
    let count = 0;
    while (true) {
      const next = [...timers].sort((a, b) => a[1].time - b[1].time)[0];
      if (!next || next[1].time > end) break;
      if (++count > 20) throw new Error("Unexpected timer loop");
      now = next[1].time;
      timers.delete(next[0]);
      next[1].callback();
    }
    now = end;
  };
  const swiper = {
    params: { autoplay: { enabled: true, delay: 5000, waitForTransition: false, disableOnInteraction: false, pauseOnMouseEnter: false }, speed: 600, loop: true },
    slides: [0, 1, 2].map(() => ({ getAttribute: () => null })),
    activeIndex: 0,
    realIndex: 0,
    el: { addEventListener: name => mouseListeners.push(name), removeEventListener() {} },
    wrapperEl: { addEventListener: name => transitionListeners.push(name), removeEventListener() {} },
    slideNext(speed) {
      this.realIndex = (this.realIndex + 1) % 3;
      this.activeIndex = this.realIndex;
      events.get("beforeTransitionStart")(this, speed, true);
    },
  };
  try {
    Autoplay({ swiper, params: swiper.params, extendParams() {}, emit() {}, on: (name, callback) => events.set(name, callback) });
    events.get("init")();
    advance(5000); assert.equal(swiper.realIndex, 1);
    advance(5000); assert.equal(swiper.realIndex, 2);
    advance(5000); assert.equal(swiper.realIndex, 0);
    advance(5000); assert.equal(swiper.realIndex, 1);
    assert.equal(swiper.autoplay.running, true);
    assert.equal(mouseListeners.includes("pointerenter"), false);
    assert.equal(transitionListeners.includes("transitionend"), false);
    events.get("destroy")();
    assert.equal(timers.size, 0);
  } finally {
    for (const [name, value] of Object.entries(original)) {
      if (value === undefined) delete globalThis[name];
      else globalThis[name] = value;
    }
  }
});
