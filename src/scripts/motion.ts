import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playOpeningIntro } from './intro';
import { createTranslator, getLanguage } from '../lib/i18n';
const t = createTranslator(getLanguage(location.pathname));

gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();

// Enhance visible HTML only after the animation library is ready.
media.add('(prefers-reduced-motion: no-preference)', (motionContext) => {
  const revealArrival = (immediate = false) => {
    const arrival = document.querySelector('.hero-inner, .detail-intro');
    if (!arrival) return;
    const lines = arrival.querySelectorAll('.hero-line');
    const details = arrival.querySelectorAll(
      '.hero-eyebrow, .hero-action, .hero-proof, .detail-label, .detail-title, .detail-lead',
    );
    const animated = [
      ...lines,
      ...details,
      ...document.querySelectorAll('.hero-field'),
    ];
    animated.forEach((element) =>
      element.setAttribute('data-intro-animated', ''),
    );
    if (immediate || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.killTweensOf(animated);
      gsap.set(animated, { clearProps: 'transform,opacity,visibility' });
      return;
    }
    motionContext.add(() => {
      gsap.from(lines, {
        yPercent: 105,
        duration: 0.95,
        stagger: 0.12,
        ease: 'expo.out',
        clearProps: 'transform',
      });
      gsap.from(details, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.hero-field', {
        opacity: 0,
        duration: 1,
        clearProps: 'opacity',
      });
    });
  };
  if (!playOpeningIntro(revealArrival)) revealArrival();

  // Animate each section as a group when it arrives, never hide the whole page.
  const sections = document.querySelectorAll(
    '.intro-card, .editorial-card, .contact-card, .detail-copy section',
  );
  sections.forEach((section) => {
    const content = Array.from(section.children);
    ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        motionContext.add(() => {
          gsap.from(content, {
            y: 20,
            opacity: 0.25,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });
        });
      },
    });
  });

  // A keyboard shortcut to a link must never wait for its entrance to finish.
  const showFocusedContent = (event: FocusEvent) => {
    if (!(event.target instanceof HTMLElement)) return;
    let element: HTMLElement | null = event.target;
    while (element && element !== document.body) {
      gsap.killTweensOf(element);
      gsap.set(element, { clearProps: 'transform,opacity' });
      element = element.parentElement;
    }
  };
  document.addEventListener('focusin', showFocusedContent);
  return () => document.removeEventListener('focusin', showFocusedContent);
});

const canvas = document.querySelector<HTMLCanvasElement>('#east-field');
const toggle = document.querySelector<HTMLButtonElement>('.motion-toggle');
const context = canvas?.getContext('2d');
if (canvas && context && toggle) {
  const field = canvas;
  const ctx = context;
  const control = toggle;
  let paused = false;

  media.add(
    {
      reduced: '(prefers-reduced-motion: reduce)',
      standard: '(prefers-reduced-motion: no-preference)',
    },
    (match) => {
      const reduced = Boolean(match.conditions?.reduced);
      let width = 0;
      let height = 0;
      let phase = 0;
      let visible = true;
      let lastFrame = 0;
      const colors = getComputedStyle(document.documentElement);
      const baseColor = colors.getPropertyValue('--etd-field').trim();
      const accentColor = colors.getPropertyValue('--cds-focus').trim();

      function draw() {
        ctx.clearRect(0, 0, width, height);
        const spacing = width < 672 ? 20 : 16;
        ctx.lineWidth = 1;
        for (let y = 8; y < height; y += spacing) {
          for (let x = 8; x < width; x += spacing) {
            const band =
              y / height - 0.6 - Math.sin((x / width) * 5 + phase) * 0.2;
            const strength = Math.exp(-band * band * 32);
            const angle = Math.sin((x / width) * 6 + phase) * strength * 1.2;
            const dx = Math.sin(angle) * 4;
            const dy = Math.cos(angle) * 4;
            ctx.strokeStyle = strength > 0.65 ? accentColor : baseColor;
            ctx.globalAlpha = 0.14 + strength * 0.2;
            ctx.beginPath();
            ctx.moveTo(x - dx, y - dy);
            ctx.lineTo(x + dx, y + dy);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }

      const tick = (time: number, delta: number) => {
        phase += Math.min(delta, 64) * 0.00028;
        if (time - lastFrame < 1 / 30) return;
        lastFrame = time;
        draw();
      };
      const syncPlayback = () => {
        gsap.ticker.remove(tick);
        if (!reduced && !paused && visible && !document.hidden) {
          gsap.ticker.add(tick);
        }
      };
      const togglePlayback = () => {
        paused = !paused;
        control.textContent = t(
          paused ? 'Resume animation' : 'Pause animation',
        );
        syncPlayback();
      };
      const resize = new ResizeObserver(([entry]) => {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        field.width = Math.round(width * ratio);
        field.height = Math.round(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        draw();
      });
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      });
      resize.observe(field);
      intersection.observe(field);
      control.hidden = reduced;
      control.textContent = t(paused ? 'Resume animation' : 'Pause animation');
      control.addEventListener('click', togglePlayback);
      document.addEventListener('visibilitychange', syncPlayback);
      syncPlayback();
      return () => {
        gsap.ticker.remove(tick);
        resize.disconnect();
        intersection.disconnect();
        control.removeEventListener('click', togglePlayback);
        document.removeEventListener('visibilitychange', syncPlayback);
        control.hidden = true;
      };
    },
  );
}
