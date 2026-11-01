import { expect, test } from 'bun:test';
import { buildProjectBrief } from '../src/lib/project-brief';

test('a brief preserves the project need, labels the selected service and omits blank optional fields', () => {
  const brief = buildProjectBrief({
    service: 'integration',
    problem: '  Connect inventory and sales.  ',
    context: '',
    users: 'Operations team',
    integrations: '',
    timeline: '',
  });
  expect(brief).toContain('API & system integration');
  expect(brief).toContain('Connect inventory and sales.');
  expect(brief).toContain('Operations team');
  expect(brief).not.toContain('undefined');
  expect(brief).not.toContain('Timeline:');
});

test('brief labels can change language without changing the visitor’s own words', () => {
  const brief = buildProjectBrief(
    {
      service: 'ai',
      problem: 'Evaluate service calls.',
      context: 'Support team',
      users: '',
      integrations: '',
      timeline: '',
    },
    'id',
  );
  expect(brief).toContain('Ringkasan proyek');
  expect(brief).toContain('Evaluate service calls.');
  expect(brief).toContain('Support team');
});
