export function shouldPlayHero({ count, choice = null, reducedMotion = false, hidden = false, focused = false }) {
  return count > 1 && (choice ?? !reducedMotion) && !hidden && !focused;
}

export function syncHeroPlayback(swiper, play) {
  if (!swiper || swiper.destroyed || !swiper.autoplay) return;
  if (!play) {
    if (swiper.autoplay.running) swiper.autoplay.stop();
  } else if (!swiper.autoplay.running) {
    swiper.autoplay.start();
  } else if (swiper.autoplay.paused) {
    swiper.autoplay.resume();
  }
}

export function observeHeroEnvironment(onChange, browser = window, page = document) {
  const preference = browser.matchMedia?.("(prefers-reduced-motion: reduce)");
  const update = () => onChange({
    reducedMotion: Boolean(preference?.matches),
    hidden: page.visibilityState === "hidden",
  });
  if (preference?.addEventListener) preference.addEventListener("change", update);
  else preference?.addListener?.(update);
  page.addEventListener("visibilitychange", update);
  update();
  return () => {
    if (preference?.removeEventListener) preference.removeEventListener("change", update);
    else preference?.removeListener?.(update);
    page.removeEventListener("visibilitychange", update);
  };
}
