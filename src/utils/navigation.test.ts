import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isStepSkipped,
  getNextStepIndex,
  getPrevStepIndex,
  parseUserProfile,
  getActivityChartData,
  getPlanChartPoints,
} from './navigation';
import { QuizStep } from '../data/quizData';

test('isStepSkipped respects step.when condition', () => {
  const steps: QuizStep[] = [
    { id: '1', type: 'single', title: 'Q1' },
    {
      id: '2',
      type: 'break',
      title: 'Break',
      when: (answers) => answers.experience === 'Nunca fiz Pilates',
    },
    { id: '3', type: 'single', title: 'Q3' },
  ];

  assert.equal(isStepSkipped(1, steps, { experience: 'Nunca fiz Pilates' }), false);
  assert.equal(isStepSkipped(1, steps, { experience: 'Sim, pratico regularmente' }), true);
});

test('getNextStepIndex advances or skips conditional step', () => {
  const steps: QuizStep[] = [
    { id: '1', type: 'single', title: 'Q1' },
    {
      id: '2',
      type: 'break',
      title: 'Break',
      when: (answers) => answers.experience === 'Nunca fiz Pilates',
    },
    { id: '3', type: 'single', title: 'Q3' },
  ];

  // Skips step 1 (break) when experience is regular
  assert.equal(getNextStepIndex(0, steps, { experience: 'Sim, pratico regularmente' }), 2);

  // Does not skip step 1 when experience is Nunca fiz Pilates
  assert.equal(getNextStepIndex(0, steps, { experience: 'Nunca fiz Pilates' }), 1);
});

test('getPrevStepIndex skips processing step when going back', () => {
  const steps: QuizStep[] = [
    { id: '1', type: 'single', title: 'Q1' },
    { id: '2', type: 'processing', title: 'Processing' },
    { id: '3', type: 'summary', title: 'Summary' },
  ];

  assert.equal(getPrevStepIndex(2, steps, {}), 0);
});

test('parseUserProfile extracts user information properly', () => {
  const profile = parseUserProfile({
    name: ' Ana  ',
    minutes: '20',
    days: '3 a 5 dias',
    experience: 'Já experimentei algumas vezes',
    goal: 'Trabalhar a barriga',
    comfort: ['Costas'],
  });

  assert.equal(profile.name, 'Ana');
  assert.equal(profile.minutes, 20);
  assert.equal(profile.days, 4);
  assert.equal(profile.level, 2);
  assert.equal(profile.goal, 'Trabalhar a barriga');
  assert.equal(profile.caution, true);
});

test('getActivityChartData returns appropriate data points', () => {
  const data = getActivityChartData('Ainda não tenho uma rotina');
  assert.equal(data.rank, 0);
  assert.equal(data.label, 'Rotina a construir');
  assert.deepEqual([data.x, data.y], [32, 199]);
});

test('getPlanChartPoints computes 3-week labels based on days per week', () => {
  const points = getPlanChartPoints(4);
  assert.equal(points.length, 4);
  assert.equal(points[0].label, '0');
  assert.equal(points[1].label, '4');
  assert.equal(points[2].label, '8');
  assert.equal(points[3].label, '12');
});
