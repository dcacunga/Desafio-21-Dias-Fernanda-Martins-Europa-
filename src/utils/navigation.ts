import { QuizStep } from '../data/quizData';

export interface UserProfile {
  name: string;
  minutes: number;
  days: number;
  level: number;
  goal: string;
  caution: boolean;
}

export function isStepSkipped(
  stepIndex: number,
  steps: QuizStep[],
  answers: Record<string, any>
): boolean {
  const step = steps[stepIndex];
  if (!step) return false;
  if (step.type === 'break' && typeof step.when === 'function') {
    return !step.when(answers);
  }
  return false;
}

export function getNextStepIndex(
  currentIndex: number,
  steps: QuizStep[],
  answers: Record<string, any>
): number {
  let next = currentIndex + 1;
  while (next < steps.length && isStepSkipped(next, steps, answers)) {
    next++;
  }
  return Math.min(steps.length - 1, next);
}

export function getPrevStepIndex(
  currentIndex: number,
  steps: QuizStep[],
  answers: Record<string, any>
): number {
  let prev = currentIndex - 1;
  while (prev >= 0 && (steps[prev]?.type === 'processing' || isStepSkipped(prev, steps, answers))) {
    prev--;
  }
  return Math.max(0, prev);
}

export function parseUserProfile(answers: Record<string, any>): UserProfile {
  const name = typeof answers.name === 'string' ? answers.name.trim() : '';
  const parsedMin = parseInt(String(answers.minutes || '10'), 10);
  const minutes = Number.isNaN(parsedMin) ? 10 : parsedMin;
  const days = answers.days === 'Todos os dias' ? 7 : answers.days === '3 a 5 dias' ? 4 : 2;
  const level =
    answers.experience === 'Sim, pratico regularmente'
      ? 3
      : answers.experience === 'Já experimentei algumas vezes'
        ? 2
        : 1;
  const goal = answers.goal || 'Criar uma rotina de movimento';
  const caution =
    Array.isArray(answers.comfort) &&
    answers.comfort.some((zone: string) => zone !== 'Nenhuma destas zonas');

  return {
    name,
    minutes,
    days,
    level,
    goal,
    caution,
  };
}

export function getActivityChartData(activity?: string) {
  const options = [
    'Ainda não tenho uma rotina',
    'Algumas vezes por mês',
    'Algumas vezes por semana',
    'Quase todos os dias',
  ];
  const rank = Math.max(0, options.indexOf(activity || 'Ainda não tenho uma rotina'));
  const points: [number, number][] = [
    [32, 199],
    [117, 174],
    [213, 111],
    [307, 49],
  ];
  const [x, y] = points[rank] || points[0];

  return {
    rank,
    x,
    y,
    label: rank < 2 ? 'Rotina a construir' : 'Rotina em movimento',
    heading:
      rank < 2
        ? 'Está na hora de dares espaço a uma nova rotina.'
        : 'O próximo passo é dar continuidade à tua rotina.',
    note:
      rank < 2
        ? 'Começa com movimentos que consigas acompanhar e organiza os teus momentos de prática.'
        : 'Aproveita a experiência que já tens para seguir uma sequência organizada de aulas.',
  };
}

export function getPlanChartPoints(days: number) {
  return [
    { x: 35, y: 180, label: '0' },
    { x: 145, y: 130, label: String(days) },
    { x: 255, y: 80, label: String(days * 2) },
    { x: 385, y: 30, label: String(days * 3) },
  ];
}
