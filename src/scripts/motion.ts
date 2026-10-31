import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();

// The HTML stays visible until GSAP is ready; links also work without JavaScript.
media.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('[data-reveal]', {
    y: 32,
    autoAlpha: 0,
    duration: 1.1,
    stagger: 0.14,
    ease: 'power3.out',
    clearProps: 'all',
  });
  gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]').forEach((element) => {
    gsap.from(element, {
      y: 32,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'all',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    });
  });
});

const canvas = document.querySelector<HTMLCanvasElement>('#east-field');
if (canvas) {
  const context = canvas.getContext('2d');
  if (context) {
    const ctx = context;
    const field = canvas;
    const state = { phase: 0, pointerX: 0.68, pointerY: 0.48 };
    let width = 0;
    let height = 0;
    let active = true;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--etd-field')
      .trim();

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      const centerX = width * state.pointerX;
      const centerY = height * state.pointerY;
      const spacing = width < 672 ? 14 : 16;
      for (let y = 8; y < height; y += spacing) {
        for (let x = 8; x < width; x += spacing) {
          const dx = x - centerX;
          const dy = (y - centerY) * 1.1;
          const radius = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(radius * 0.013 - state.phase);
          const envelope = Math.exp(-radius / (width * 0.55));
          const angle = wave * envelope * 1.4;
          const length = 2 + (wave + 1) * 2.4;
          const fade = Math.min(1, y / 80, (height - y) / 80);
          ctx.globalAlpha =
            (0.16 + envelope * (wave + 1) * 0.14) * Math.max(0, fade);
          const sx = Math.sin(angle) * length;
          const sy = Math.cos(angle) * length;
          ctx.beginPath();
          ctx.moveTo(x - sx, y - sy);
          ctx.lineTo(x + sx, y + sy);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      field.width = width * ratio;
      field.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    });
    resize.observe(field);

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const wave = gsap.to(state, {
        phase: Math.PI * 2,
        duration: 18,
        repeat: -1,
        ease: 'none',
      });
      const tick = () => {
        if (active && !document.hidden) draw();
      };
      const observer = new IntersectionObserver(([entry]) => {
        active = entry.isIntersecting;
        if (active && !document.hidden) wave.resume();
        else wave.pause();
      });
      observer.observe(field);
      const visibility = () => {
        if (document.hidden || !active) wave.pause();
        else wave.resume();
      };
      document.addEventListener('visibilitychange', visibility);
      gsap.ticker.add(tick);
      return () => {
        wave.kill();
        observer.disconnect();
        document.removeEventListener('visibilitychange', visibility);
        gsap.ticker.remove(tick);
        state.phase = 0;
        draw();
      };
    });
  }
}
