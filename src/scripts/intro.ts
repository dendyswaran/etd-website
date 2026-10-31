import { gsap } from 'gsap';

/** A brand entrance, not a network progress meter. Always yields to navigation. */
export function playOpeningIntro(
  revealHero: (immediate?: boolean) => void,
): boolean {
  const root = document.documentElement;
  const screen = document.querySelector<HTMLElement>('#opening-intro');
  const target = document.querySelector<HTMLElement>('.site-header .brand');
  const identity = screen?.querySelector<HTMLElement>('.intro-identity');
  if (!root.dataset.intro || !screen || !target || !identity) return false;

  const surface = screen.querySelector('.intro-surface');
  const bars = screen.querySelectorAll('.intro-bar');
  const words = screen.querySelectorAll('.intro-word');
  const skip = screen.querySelector<HTMLButtonElement>('.intro-skip');
  const page = document.querySelectorAll<HTMLElement>(
    '.site-header, main, .site-footer',
  );
  const headerParts = document.querySelectorAll('.site-header > :not(.brand)');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let timeline: gsap.core.Timeline | undefined;
  let complete = false;
  let revealed = false;

  page.forEach((element) => {
    element.inert = true;
  });
  const reveal = (immediate = false) => {
    if (revealed) return;
    revealed = true;
    root.dataset.intro = 'reveal';
    revealHero(immediate);
  };
  const finish = () => {
    if (complete) return;
    complete = true;
    const interrupted = !timeline || timeline.progress() < 1;
    timeline?.kill();
    if (!revealed) reveal(interrupted);
    else if (interrupted) revealHero(true);
    const moveFocus = screen.contains(document.activeElement);
    screen.hidden = true;
    delete root.dataset.intro;
    page.forEach((element) => {
      element.inert = false;
    });
    gsap.set(headerParts, { clearProps: 'transform,opacity' });
    try {
      sessionStorage.setItem('etd:intro-seen', '1');
    } catch {
      /* Optional optimization. */
    }
    skip?.removeEventListener('click', finish);
    document.removeEventListener('keydown', handleKey);
    document.removeEventListener('etd:intro-timeout', finish);
    window.removeEventListener('resize', finish);
    window.removeEventListener('pagehide', finish);
    preference.removeEventListener('change', handlePreference);
    document.dispatchEvent(new Event('etd:intro-complete'));
    if (moveFocus)
      document
        .querySelector<HTMLElement>('#main')
        ?.focus({ preventScroll: true });
  };
  const handleKey = (event: KeyboardEvent) => {
    if (
      ['Escape', 'Tab', 'PageDown', 'End', 'ArrowDown', ' '].includes(event.key)
    )
      finish();
  };
  const handlePreference = () => {
    if (preference.matches) finish();
  };
  skip?.addEventListener('click', finish);
  document.addEventListener('keydown', handleKey);
  document.addEventListener('etd:intro-timeout', finish, { once: true });
  window.addEventListener('resize', finish, { once: true });
  window.addEventListener('pagehide', finish, { once: true });
  preference.addEventListener('change', handlePreference);

  // Fonts can improve the handoff, but a slow font must never hold the page hostage.
  Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 600)),
  ]).then(() => {
    if (complete) return;
    if (preference.matches) {
      finish();
      return;
    }
    const box = target.getBoundingClientRect();
    const centerScale = Math.min(
      5.2,
      (innerWidth - 64) / box.width,
      (innerHeight * 0.24) / box.height,
    );
    const position = (scale: number) => ({
      x: (innerWidth - box.width * scale) / 2 - box.left,
      y: (innerHeight - box.height * scale) / 2 - box.top,
      scale,
    });
    identity.style.left = `${box.left}px`;
    identity.style.top = `${box.top}px`;
    root.dataset.intro = 'playing';
    headerParts.forEach((element) =>
      element.setAttribute('data-intro-animated', ''),
    );
    gsap.set(headerParts, { opacity: 0, y: -8 });
    gsap.set(identity, {
      ...position(centerScale * 1.65),
      opacity: 0,
      transformOrigin: '0 0',
    });
    gsap.set(words, { yPercent: 110 });
    gsap.set(bars, { scaleY: 0, transformOrigin: '50% 50%' });

    timeline = gsap.timeline({ onComplete: finish });
    timeline
      .fromTo(
        '.intro-meta, .intro-caption, .intro-skip',
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
        0,
      )
      .to(
        bars,
        {
          scaleY: 1,
          duration: 0.5,
          stagger: { each: 0.018, from: 'center' },
          ease: 'expo.out',
        },
        0,
      )
      .to(
        bars,
        {
          x: (index) => ((7.5 - index) * innerWidth) / 16,
          scaleX: 0.12,
          opacity: 0,
          duration: 0.65,
          stagger: { each: 0.012, from: 'edges' },
          ease: 'power3.inOut',
        },
        0.5,
      )
      .to(identity, { opacity: 1, duration: 0.25 }, 0.72)
      .to(
        identity,
        { ...position(centerScale), duration: 0.9, ease: 'expo.out' },
        0.72,
      )
      .to(
        words,
        { yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out' },
        0.8,
      )
      .fromTo(
        '.intro-mark-arrow',
        { x: -6, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
        1,
      )
      .fromTo(
        '.intro-pattern',
        { opacity: 0 },
        { opacity: 0.7, duration: 0.7 },
        1,
      )
      .to(
        '.intro-meta, .intro-caption, .intro-skip',
        { opacity: 0, duration: 0.2 },
        1.7,
      )
      .add(() => reveal(), 1.85)
      .to(
        identity,
        { x: 0, y: 0, scale: 1, duration: 0.85, ease: 'expo.inOut' },
        1.85,
      )
      .to(surface, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 1.85)
      .to(
        headerParts,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          clearProps: 'transform,opacity',
          ease: 'power3.out',
        },
        2.3,
      );
  });
  return true;
}
