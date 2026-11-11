// Quiz questions and steps definition for Desafio 21 Dias

export interface QuizOption {
  label: string;
  image?: string;
  emoji?: string;
}

export interface QuizStep {
  id: string;
  type: 'hero' | 'single' | 'multi' | 'name' | 'intro' | 'break' | 'news' | 'measure' | 'processing' | 'summary' | 'plan' | 'offer-vsl' | 'offer';
  title?: string;
  sub?: string;
  btnText?: string;
  cards?: boolean;
  options?: QuizOption[];
  exclusive?: string[];
  unit?: string;
  altUnit?: string;
  min?: number;
  max?: number;
  value?: number;
  icon?: string;
  stat?: string;
  statSub?: string;
  headline?: string;
  when?: (answers: Record<string, any>) => boolean;
}

export const EMOJI_MAP: Record<string, string> = {
  "Sim, pratico regularmente": "🏅",
  "Já experimentei algumas vezes": "🙂",
  "Nunca fiz Pilates": "🌱",
  "Ombros": "🤷‍♀️",
  "Joelhos": "🦵",
  "Costas": "🔙",
  "Pés ou tornozelos": "🦶",
  "Nenhuma destas zonas": "✅",
  "Mais forte e firme": "💪",
  "Com mais liberdade de movimento": "🤸",
  "Mais confiante": "😊",
  "Com mais energia para o dia a dia": "⚡",
  "Há menos de um ano": "📅",
  "Entre 1 e 2 anos": "🗓️",
  "Há mais de 3 anos": "⏳",
  "Não sei dizer": "🤔",
  "Quase todos os dias": "🔥",
  "Algumas vezes por semana": "👟",
  "Algumas vezes por mês": "🚶‍♀️",
  "Ainda não tenho uma rotina": "🛋️",
  "Preciso de parar para recuperar o fôlego": "😮‍💨",
  "Fico um pouco cansada": "😅",
  "Sinto-me confortável": "😌",
  "Depende do dia": "🔄",
  "Falta de tempo": "⏰",
  "Não saber por onde começar": "🧭",
  "Treinos difíceis de acompanhar": "😓",
  "Falta de motivação": "🔋",
  "Não ter um plano organizado": "📋",
  "Nenhum destes motivos": "✅",
  "Menos de 5 horas": "😴",
  "Entre 5 e 6 horas": "🥱",
  "Entre 7 e 8 horas": "🛌",
  "Mais de 8 horas": "🌙",
  "Costumo sentir-me cansada": "🪫",
  "Sinto uma quebra depois do almoço": "🍽️",
  "Varia bastante ao longo do dia": "📈",
  "Sinto-me disposta na maior parte do dia": "⚡",
  "Menos de 2 copos": "🥛",
  "Entre 2 e 5 copos": "🥤",
  "Entre 1 e 2 litros": "💧",
  "Mais de 2 litros": "🌊",
  "Não costumo contar": "🤷‍♀️",
  "Sentir-me mais confiante": "😊",
  "Cuidar de mim e da minha disposição": "💆‍♀️",
  "Sentir-me melhor nas minhas roupas": "👗",
  "Voltar a reservar tempo para mim": "⏳",
  "Criar um hábito que consiga manter": "🌱",
  "Sim, quero começar o meu desafio hoje!": "🔥",
  "Sim, estou pronta para dedicar este tempo à minha saúde.": "💚"
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    "id": "urgent-intro",
    "type": "hero",
    "title": "Seca a tua barriga em 21 dias com 10 minutos na parede.",
    "btnText": "🟢 COMEÇAR A MINHA AVALIAÇÃO GRATUITA"
  },
  {
    "id": "age",
    "type": "single",
    "title": "O teu desafio de 21 dias começa aqui",
    "sub": "Selecciona a tua faixa etária.",
    "cards": true,
    "options": [
      {
        "label": "18 a 29 anos",
        "image": "age-1"
      },
      {
        "label": "30 a 39 anos",
        "image": "age-2"
      },
      {
        "label": "40 a 49 anos",
        "image": "age-3"
      },
      {
        "label": "50 ou mais",
        "image": "age-4"
      }
    ]
  },
  {
    "id": "zones",
    "type": "multi",
    "title": "Que parte do teu corpo gostarias de trabalhar primeiro?",
    "sub": "Escolhe as opções que quiseres e carrega em “Continuar”.",
    "cards": true,
    "options": [
      {
        "label": "Pneuzinhos",
        "image": "zone-sides"
      },
      {
        "label": "Cintura",
        "image": "zone-waist"
      },
      {
        "label": "Barriga",
        "image": "zone-belly"
      },
      {
        "label": "Glúteos",
        "image": "zone-glutes"
      },
      {
        "label": "Pernas",
        "image": "zone-legs"
      },
      {
        "label": "Braços",
        "image": "zone-arms"
      }
    ]
  },
  {
    "id": "goal",
    "type": "single",
    "title": "Qual é o teu principal objectivo com o Pilates?",
    "options": [
      {
        "label": "Trabalhar a barriga",
        "emoji": "🎯"
      },
      {
        "label": "Aumentar a força muscular",
        "emoji": "💪"
      },
      {
        "label": "Melhorar a flexibilidade",
        "emoji": "🤸"
      },
      {
        "label": "Ter um momento para relaxar",
        "emoji": "😌"
      },
      {
        "label": "Movimentar-me com mais conforto",
        "emoji": "🧘"
      }
    ]
  },
  {
    "id": "name",
    "type": "name",
    "title": "Como te chamas?",
    "sub": "Só precisamos do teu primeiro nome para apresentar o teu resumo."
  },
  {
    "id": "intro",
    "type": "intro",
    "title": "Chamo-me Professora Fernanda Martins!"
  },
  {
    "id": "experience",
    "type": "single",
    "title": "Já praticaste Pilates antes?",
    "options": [
      {
        "label": "Sim, pratico regularmente",
        "emoji": "🏅"
      },
      {
        "label": "Já experimentei algumas vezes",
        "emoji": "🙂"
      },
      {
        "label": "Nunca fiz Pilates",
        "emoji": "🌱"
      }
    ]
  },
  {
    id: "break-beginner",
    type: "break",
    when: (answers: Record<string, any>) => answers.experience === "Nunca fiz Pilates",
    icon: "🤝",
    title: "Não estás sozinha 💛",
    stat: "84,7%",
    statSub: "das nossas alunas",
    sub: "relatam que começaram do zero, em casa, e foram ganhando confiança aula a aula, mesmo sem experiência prévia.",
    btnText: "Entendi, quero continuar"
  },
  {
    "id": "news-tvzimbo",
    "type": "news",
    "headline": "Exercícios de 10 minutos na parede de casa viram a alternativa natural a ginásios e remédios caros em Luanda",
    "btnText": "Continuar"
  },
  {
    "id": "day",
    "type": "single",
    "title": "Como descreverias o teu dia típico?",
    "options": [
      {
        "label": "Passo a maior parte do dia sentada",
        "emoji": "💻"
      },
      {
        "label": "Movimento-me de vez em quando",
        "emoji": "🚶"
      },
      {
        "label": "Passo boa parte do dia de pé",
        "emoji": "👣"
      }
    ]
  },
  {
    "id": "flexibility",
    "type": "single",
    "title": "Como está a tua flexibilidade?",
    "sub": "Responde com base no que sentes hoje. Não precisas de testar nenhum movimento agora.",
    "options": [
      {
        "label": "Sou flexível",
        "emoji": "💃"
      },
      {
        "label": "Sou mais ou menos flexível",
        "emoji": "🙂"
      },
      {
        "label": "Tenho pouca flexibilidade",
        "emoji": "🌱"
      }
    ]
  },
  {
    "id": "comfort",
    "type": "multi",
    "title": "Há alguma zona que precise de atenção ao treinares?",
    "sub": "Selecciona as zonas que precisam de atenção ou indica que nenhuma se aplica.",
    "options": [
      {
        "label": "Ombros",
        "emoji": "🤷‍♀️"
      },
      {
        "label": "Joelhos",
        "emoji": "🦵"
      },
      {
        "label": "Costas",
        "emoji": "🔙"
      },
      {
        "label": "Pés ou tornozelos",
        "emoji": "🦶"
      },
      {
        "label": "Nenhuma destas zonas",
        "emoji": "✅"
      }
    ],
    "exclusive": [
      "Nenhuma destas zonas"
    ]
  },
  {
    "id": "body",
    "type": "single",
    "title": "Como descreves o teu corpo hoje?",
    "sub": "Escolhe a opção com que mais te identificas.",
    "cards": true,
    "options": [
      {
        "label": "Magro",
        "image": "body-1"
      },
      {
        "label": "Médio",
        "image": "body-2"
      },
      {
        "label": "Meio pesado",
        "image": "body-3"
      },
      {
        "label": "Excesso de peso",
        "image": "body-4"
      }
    ]
  },
  {
    "id": "desire",
    "type": "single",
    "title": "Como gostarias de te sentir no teu corpo?",
    "options": [
      {
        "label": "Mais forte e firme",
        "emoji": "💪"
      },
      {
        "label": "Com mais liberdade de movimento",
        "emoji": "🤸"
      },
      {
        "label": "Mais confiante",
        "emoji": "😊"
      },
      {
        "label": "Com mais energia para o dia a dia",
        "emoji": "⚡"
      }
    ]
  },
  {
    "id": "bestShape",
    "type": "single",
    "title": "Há quanto tempo te sentiste na tua melhor forma?",
    "options": [
      {
        "label": "Há menos de um ano",
        "emoji": "📅"
      },
      {
        "label": "Entre 1 e 2 anos",
        "emoji": "🗓️"
      },
      {
        "label": "Há mais de 3 anos",
        "emoji": "⏳"
      },
      {
        "label": "Não sei dizer",
        "emoji": "🤔"
      }
    ]
  },
  {
    "id": "activity",
    "type": "single",
    "title": "Com que frequência fazes exercício?",
    "options": [
      {
        "label": "Quase todos os dias",
        "emoji": "🔥"
      },
      {
        "label": "Algumas vezes por semana",
        "emoji": "👟"
      },
      {
        "label": "Algumas vezes por mês",
        "emoji": "🚶‍♀️"
      },
      {
        "label": "Ainda não tenho uma rotina",
        "emoji": "🛋️"
      }
    ]
  },
  {
    "id": "stairs",
    "type": "single",
    "title": "Como te sentes depois de subir escadas?",
    "options": [
      {
        "label": "Preciso de parar para recuperar o fôlego",
        "emoji": "😮‍💨"
      },
      {
        "label": "Fico um pouco cansada",
        "emoji": "😅"
      },
      {
        "label": "Sinto-me confortável",
        "emoji": "😌"
      },
      {
        "label": "Depende do dia",
        "emoji": "🔄"
      }
    ]
  },
  {
    "id": "barriers",
    "type": "multi",
    "title": "O que mais te dificultou manter uma rotina?",
    "sub": "Podes escolher mais de uma opção.",
    "options": [
      {
        "label": "Falta de tempo",
        "emoji": "⏰"
      },
      {
        "label": "Não saber por onde começar",
        "emoji": "🧭"
      },
      {
        "label": "Treinos difíceis de acompanhar",
        "emoji": "😓"
      },
      {
        "label": "Falta de motivação",
        "emoji": "🔋"
      },
      {
        "label": "Não ter um plano organizado",
        "emoji": "📋"
      },
      {
        "label": "Nenhum destes motivos",
        "emoji": "✅"
      }
    ],
    "exclusive": [
      "Nenhum destes motivos"
    ]
  },
  {
    id: "break-barriers",
    type: "break",
    when: (answers: Record<string, any>) => Array.isArray(answers.barriers) && answers.barriers.some((b: string) => b !== "Nenhum destes motivos"),
    title: "Não és a única 💛",
    sub: "O que sentes é mais comum do que imaginas. Muitas das nossas alunas passaram pelo mesmo antes do Desafio de 21 Dias. Por isso, o plano é feito de aulas simples de acompanhar, no teu ritmo."
  },
  {
    "id": "sleep",
    "type": "single",
    "title": "Quantas horas dormes, em média, por noite?",
    "options": [
      {
        "label": "Menos de 5 horas",
        "emoji": "😴"
      },
      {
        "label": "Entre 5 e 6 horas",
        "emoji": "🥱"
      },
      {
        "label": "Entre 7 e 8 horas",
        "emoji": "🛌"
      },
      {
        "label": "Mais de 8 horas",
        "emoji": "🌙"
      }
    ]
  },
  {
    "id": "energy",
    "type": "single",
    "title": "Como está a tua energia durante o dia?",
    "options": [
      {
        "label": "Costumo sentir-me cansada",
        "emoji": "🪫"
      },
      {
        "label": "Sinto uma quebra depois do almoço",
        "emoji": "🍽️"
      },
      {
        "label": "Varia bastante ao longo do dia",
        "emoji": "📈"
      },
      {
        "label": "Sinto-me disposta na maior parte do dia",
        "emoji": "⚡"
      }
    ]
  },
  {
    "id": "water",
    "type": "single",
    "title": "Quanto de água costumas beber por dia?",
    "options": [
      {
        "label": "Menos de 2 copos",
        "emoji": "🥛"
      },
      {
        "label": "Entre 2 e 5 copos",
        "emoji": "🥤"
      },
      {
        "label": "Entre 1 e 2 litros",
        "emoji": "💧"
      },
      {
        "label": "Mais de 2 litros",
        "emoji": "🌊"
      },
      {
        "label": "Não costumo contar",
        "emoji": "🤷‍♀️"
      }
    ]
  },
  {
    "id": "food",
    "type": "single",
    "title": "Qual destas opções se aproxima mais da tua alimentação?",
    "cards": true,
    "options": [
      {
        "label": "Tradicional, como de tudo",
        "image": "food-1"
      },
      {
        "label": "Carnes, peixe e ovos",
        "image": "food-2"
      },
      {
        "label": "Vegetariana",
        "image": "food-3"
      },
      {
        "label": "Comidas rápidas",
        "image": "ext-06"
      }
    ]
  },
  {
    "id": "motivation",
    "type": "single",
    "title": "Qual é o teu maior motivo para começar?",
    "options": [
      {
        "label": "Sentir-me mais confiante",
        "emoji": "😊"
      },
      {
        "label": "Cuidar de mim e da minha disposição",
        "emoji": "💆‍♀️"
      },
      {
        "label": "Sentir-me melhor nas minhas roupas",
        "emoji": "👗"
      },
      {
        "label": "Voltar a reservar tempo para mim",
        "emoji": "⏳"
      },
      {
        "label": "Criar um hábito que consiga manter",
        "emoji": "🌱"
      }
    ]
  },
  {
    "id": "feelings",
    "type": "single",
    "title": "Como te sentes em relação ao teu corpo e às tuas roupas ultimamente?",
    "sub": "Escolhe a opção com que mais te identificas.",
    "options": [
      {
        "label": "Frustrada porque as minhas roupas favoritas já não me servem bem",
        "emoji": "👗"
      },
      {
        "label": "Sem energia e com a sensação de barriga inchada no final do dia",
        "emoji": "😮‍💨"
      },
      {
        "label": "Insegura com a falta de tonificação",
        "emoji": "🪞"
      }
    ]
  },
  {
    "id": "break-feelings",
    "type": "break",
    "title": "Obrigada por partilhares 💛",
    "sub": "A maioria das nossas alunas sentia exactamente o mesmo antes de começar o Desafio de 21 Dias. Vamos montar o teu plano a pensar nisso."
  },
  {
    "id": "height",
    "type": "measure",
    "title": "Qual é a tua altura?",
    "sub": "Indica a tua altura aproximada.",
    "unit": "cm",
    "altUnit": "pol",
    "min": 100,
    "max": 230,
    "value": 165
  },
  {
    "id": "minutes",
    "type": "single",
    "title": "Quanto tempo gostarias de reservar por dia?",
    "sub": "Escolhe o tempo que realmente cabe na tua rotina.",
    "cards": true,
    "options": [
      {
        "label": "10 minutos",
        "image": "minutes-10"
      },
      {
        "label": "20 minutos",
        "image": "minutes-20"
      },
      {
        "label": "30 minutos",
        "image": "minutes-30"
      },
      {
        "label": "60 minutos",
        "image": "minutes-60"
      }
    ]
  },
  {
    "id": "days",
    "type": "single",
    "title": "Quantos dias por semana consegues reservar?",
    "sub": "Uma rotina possível é mais fácil de manter.",
    "cards": true,
    "options": [
      {
        "label": "1 a 2 dias",
        "image": "days-2"
      },
      {
        "label": "3 a 5 dias",
        "image": "days-4"
      },
      {
        "label": "Todos os dias",
        "image": "days-7"
      }
    ]
  },
  {
    "id": "intensity",
    "type": "single",
    "title": "Como preferes começar?",
    "options": [
      {
        "label": "Com movimentos simples e um ritmo tranquilo",
        "emoji": "🌱"
      },
      {
        "label": "Com uma rotina equilibrada",
        "emoji": "🙂"
      },
      {
        "label": "Com mais desafio, respeitando os meus limites",
        "emoji": "💪"
      }
    ]
  },
  {
    "id": "commitment",
    "type": "single",
    "title": "Estás pronta para reservar este tempo para ti?",
    "options": [
      {
        "label": "Sim, quero começar o meu desafio hoje!",
        "emoji": "🔥"
      },
      {
        "label": "Sim, estou pronta para dedicar este tempo à minha saúde.",
        "emoji": "💚"
      }
    ]
  },
  {
    "id": "processing",
    "type": "processing",
    "title": "Estamos a criar o teu plano de aulas personalizado!"
  },
  {
    "id": "summary",
    "type": "summary",
    "title": "Este é o teu ponto de partida"
  },
  {
    "id": "plan",
    "type": "plan",
    "title": "O teu plano de treino de Pilates está pronto!"
  },
  {
    "id": "offer-vsl",
    "type": "offer-vsl",
    "title": "Assiste ao vídeo"
  },
  {
    "id": "offer",
    "type": "offer",
    "title": "O teu desafio está pronto"
  }
];
