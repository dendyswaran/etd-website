import { createTranslator, type Language } from './i18n';
export interface BriefValues {
  service: string;
  context: string;
  problem: string;
  users: string;
  integrations: string;
  timeline: string;
}
export const serviceOptions = [
  { value: 'website', label: 'Website development' },
  { value: 'custom', label: 'Custom business application' },
  { value: 'mobile', label: 'Mobile application' },
  { value: 'integration', label: 'API & system integration' },
  { value: 'ai', label: 'AI & automation' },
  { value: 'unsure', label: 'Not sure yet' },
];
export function buildProjectBrief(
  values: BriefValues,
  language: Language = 'en',
): string {
  const t = createTranslator(language);
  const fields: Array<[string, string]> = [
    [
      'Service',
      t(
        serviceOptions.find((option) => option.value === values.service)
          ?.label ?? 'Not specified',
      ),
    ],
    ['Business context', values.context],
    ['Problem to solve', values.problem],
    ['People using the system', values.users],
    ['Existing systems & integrations', values.integrations],
    ['Timeline', values.timeline],
  ];
  return [
    t('Project brief'),
    'East Town Digital',
    '',
    ...fields
      .filter(([, value]) => value.trim())
      .map(([label, value]) => `${t(label)}: ${value.trim()}`),
  ].join('\n');
}
