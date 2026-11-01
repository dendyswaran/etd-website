import {
  buildProjectBrief,
  serviceOptions,
  type BriefValues,
} from '../lib/project-brief';
import { createTranslator, getLanguage } from '../lib/i18n';
const builder = document.querySelector<HTMLElement>('[data-brief-builder]');
if (builder) {
  const t = createTranslator(getLanguage(location.pathname));
  const form = builder.querySelector<HTMLFormElement>('form')!;
  const review = builder.querySelector<HTMLButtonElement>(
    '[data-brief-review]',
  )!;
  const copy = builder.querySelector<HTMLButtonElement>('[data-brief-copy]')!;
  const summary = builder.querySelector<HTMLTextAreaElement>('#brief-summary')!;
  const status = builder.querySelector<HTMLElement>('.brief-status')!;
  const keys = [
    'service',
    'context',
    'problem',
    'users',
    'integrations',
    'timeline',
  ] as const;
  const fields = Object.fromEntries(
    keys.map((key) => [
      key,
      builder.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >(`#brief-${key}`)!,
    ]),
  ) as Record<
    (typeof keys)[number],
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  const values = (): BriefValues =>
    Object.fromEntries(
      keys.map((key) => [key, fields[key].value]),
    ) as unknown as BriefValues;
  try {
    const saved: unknown = JSON.parse(
      sessionStorage.getItem('etd:project-brief') ?? 'null',
    );
    if (saved && typeof saved === 'object')
      for (const key of keys) {
        const value = (saved as Record<string, unknown>)[key];
        if (typeof value === 'string')
          fields[key].value = value.slice(
            0,
            fields[key].getAttribute('maxlength')
              ? Number(fields[key].getAttribute('maxlength'))
              : 100,
          );
      }
  } catch {
    /* Storage is optional. */
  }
  const preset = new URLSearchParams(location.search).get('service');
  if (serviceOptions.some((option) => option.value === preset))
    fields.service.value = preset!;
  review.hidden = false;
  copy.hidden = false;
  const refreshSummary = () => {
    summary.value = buildProjectBrief(values(), getLanguage(location.pathname));
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', () => {
    try {
      sessionStorage.setItem('etd:project-brief', JSON.stringify(values()));
    } catch {
      /* Keep editing without storage. */
    }
    if (!copy.disabled) refreshSummary();
    status.textContent = '';
  });
  review.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    refreshSummary();
    copy.disabled = false;
    status.textContent = t('Brief ready. Review it before sharing.');
    summary.focus({ preventScroll: true });
    summary.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.value);
      status.textContent = t(
        'Brief copied. Paste it into your WhatsApp conversation.',
      );
    } catch {
      summary.focus();
      summary.select();
      status.textContent = t('Select the summary and copy it manually.');
    }
  });
}
