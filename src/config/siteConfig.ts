export interface BonusItem {
  img: string;
  title: string;
  value: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const SITE_CONFIG = {
  expert: 'Fernanda Martins',
  title: 'Desafio de Pilates na Parede',
  durationDays: 21,
  price: 9.23, // In Euros (converted from 6.990 Kz)
  oldPrice: 46.22, // In Euros (converted from 35.000 Kz)
  currency: '€',
  currencyName: 'Euros',
  guaranteeDays: 30,
  checkoutUrl: 'https://pay.clickpayon.com/904f4d31-d9cf-4aba-8404-7eecfe5fa888',
  vslHeroId: 'vid-6af3908ea46040eb1d0c3046',
  vslHeroScript:
    'https://scripts.converteai.net/0f437237-527a-4535-bdf5-d5d791480e65/players/6af3908ea46040eb1d0c3046/v4/player.js',
  vslOfferId: 'vid-6af39118ca48af3c3652a518',
  vslOfferScript:
    'https://scripts.converteai.net/0f437237-527a-4535-bdf5-d5d791480e65/players/6af39118ca48af3c3652a518/v4/player.js',

  features: [
    {
      icon: '▶',
      title: 'Plano de aulas em casa',
      desc: 'Uma sequência organizada para acompanhares ao longo do desafio.',
    },
    {
      icon: '◎',
      title: 'Demonstração dos movimentos',
      desc: 'Orientações visuais para acompanhares cada aula.',
    },
    {
      icon: '▦',
      title: 'Calendário de três semanas',
      desc: 'Um caminho claro para distribuir a prática na tua rotina.',
    },
    {
      icon: '🎁',
      title: 'Materiais complementares',
      desc: 'Guias de apoio para consultares durante o programa.',
    },
    {
      icon: '🤝',
      title: 'Acompanhamento por 30 dias',
      desc: 'Fernanda e equipa estarão contigo para tirar dúvidas e apoiar-te durante o desafio.',
    },
  ] as FeatureItem[],

  bonuses: [
    {
      img: '/media/ext-02.webp',
      title: 'Receitas saudáveis',
      value: '14,39 €',
    },
    {
      img: '/media/ext-00.webp',
      title: 'Guia Eliminando a Flacidez',
      value: '12,52 €',
    },
    {
      img: '/media/ext-03.webp',
      title: 'Guia Eliminando a Celulite',
      value: '12,23 €',
    },
    {
      img: '/media/ext-04.webp',
      title: 'Como Superar a Menopausa',
      value: '14,05 €',
    },
  ] as BonusItem[],

  faqs: [
    {
      q: 'Preciso de experiência em Pilates?',
      a: 'Podes começar como iniciante. Acompanha as orientações de cada aula e ajusta o movimento ao teu nível de conforto.',
    },
    {
      q: 'Tenho de pagar todos os meses?',
      a: 'Não. O valor apresentado é de 9,23 Euros, em pagamento único.',
    },
    {
      q: 'Preciso de aparelhos?',
      a: 'A proposta é praticar em casa, com uma parede e espaço livre. Um tapete confortável pode ajudar nos movimentos realizados no chão.',
    },
    {
      q: 'Como recebo o acesso?',
      a: 'Após a confirmação do pagamento, receberás o acesso pelo WhatsApp e pelo email informados na compra.',
    },
    {
      q: 'E se eu não gostar?',
      a: 'Tens uma garantia de 30 dias. Se não ficares satisfeita, podes solicitar o reembolso dentro desse prazo.',
    },
    {
      q: 'E se tiver dor, lesão ou alguma limitação?',
      a: 'Procura orientação de um profissional de saúde antes de iniciar. O questionário não avalia se um exercício é adequado ao teu caso. Interrompe qualquer movimento que provoque dor.',
    },
    {
      q: 'Vou perder uma quantidade específica de peso?',
      a: 'Não há uma quantidade de peso garantida. Os resultados dependem de vários factores e variam de pessoa para pessoa. O desafio organiza a tua prática durante 21 dias.',
    },
  ] as FaqItem[],
};
