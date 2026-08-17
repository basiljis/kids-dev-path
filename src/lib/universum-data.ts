export type SphereKey = "cognitive" | "speech" | "emotional" | "social" | "motor";

export const SPHERES: Record<SphereKey, { label: string; color: string; token: string }> = {
  cognitive: { label: "Когнитивное", color: "var(--cognitive)", token: "cognitive" },
  speech: { label: "Речевое", color: "var(--speech)", token: "speech" },
  emotional: { label: "Эмоциональное", color: "var(--emotional)", token: "emotional" },
  social: { label: "Социальное", color: "var(--social)", token: "social" },
  motor: { label: "Моторное", color: "var(--motor)", token: "motor" },
};

export const SPHERE_ORDER: SphereKey[] = [
  "cognitive",
  "speech",
  "emotional",
  "social",
  "motor",
];

export type ProductCategory = "hardware" | "software" | "vr_ar" | "bos" | "surface";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  hardware: "Оборудование",
  software: "ПО / тренажёры",
  vr_ar: "VR / AR",
  bos: "БОС-тренажёры",
  surface: "Интерактивные поверхности",
};

export const OVZ_LABELS: Record<string, string> = {
  RAS: "РАС (F84.0)",
  ZPR: "ЗПР",
  TNR: "ТНР",
  DCP: "ДЦП",
  typical: "Без ОВЗ",
};

export type MetricImpact = {
  metric: string;
  metricLabel: string;
  sphere: SphereKey;
  impact: number;
  basis: string;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  date: string;
  text: string;
  usageTime?: string;
};

export type Product = {
  id: string;
  name: string;
  vendor: string;
  category: ProductCategory;
  description: string;
  features: string[];
  pricePurchase: number;
  priceRental: number;
  validated: boolean;
  rating: number;
  reviews: number;
  ageMinMonths: number;
  ageMaxMonths: number;
  ovz: string[];
  sessions: string;
  duration: string;
  setup: string;
  metrics: MetricImpact[];
  papers: { title: string; doi: string; note: string }[];
  integrations: string[];
  userReviews?: Review[];
};


const m = (
  metric: string,
  metricLabel: string,
  sphere: SphereKey,
  impact: number,
  basis: string,
): MetricImpact => ({ metric, metricLabel, sphere, impact, basis });

export const PRODUCTS: Product[] = [
  {
    id: "kidalki-wall",
    name: "Интерактивная стена «Кидалки»",
    vendor: "Kidalki Systems",
    category: "surface",
    description:
      "Интерактивная проекционная стена с трекингом движений: игровые сценарии для тренировки зрительно-моторной координации, крупной моторики и межполушарного взаимодействия.",
    features: [
      "Трекинг движений без носимых датчиков",
      "42 коррекционных игровых сценария",
      "Автоматическая выгрузка метрик в карту ребёнка",
    ],
    pricePurchase: 480000,
    priceRental: 24000,
    validated: true,
    rating: 4.8,
    reviews: 127,
    ageMinMonths: 36,
    ageMaxMonths: 144,
    ovz: ["RAS", "ZPR", "DCP", "typical"],
    sessions: "3-5 раз/неделю",
    duration: "15-20 минут",
    setup: "15 минут",
    metrics: [
      m("hand_eye_coordination", "Зрительно-моторная координация", "motor", 85,
        "Sugden & Chambers (2005) — игровые тренировки улучшают координацию на 40%"),
      m("gross_motor", "Крупная моторика", "motor", 70,
        "Lange et al. (2012) — Kinect-терапия улучшает моторные показатели"),
      m("bilateral_integration", "Межполушарное взаимодействие", "cognitive", 60,
        "Бурцев (2019) — билатеральные упражнения и когнитивный контроль"),
      m("joint_attention", "Совместное внимание", "social", 45,
        "Kasari et al. (2010) — совместные игровые задачи"),
    ],
    papers: [
      { title: "Вмешательство в моторные навыки у детей с расстройством координации развития", doi: "10.1016/j.ridd.2005.03.003", note: "n=150, r = 0.82" },
      { title: "Реабилитационные игры на базе Kinect для детей с нарушениями моторики", doi: "10.1109/EMBC.2012.6346663", note: "n=47, p<0.05" },
      { title: "Билатеральная моторная координация у детей с расстройствами аутистического спектра", doi: "10.1080/17518423.2015.1065538", note: "n=22" },
    ],
    integrations: ["API v2.1", "Webhook", "АИС ППк"],
    userReviews: [
      { id: "r1", userName: "Марина С.", rating: 5, date: "12.08.2026", text: "Отличный тренажер для развития крупной моторики. Ребенок в восторге от игровых сценариев, а я вижу реальный прогресс.", usageTime: "6 месяцев" },
      { id: "r2", userName: "Алексей В.", rating: 4, date: "05.07.2026", text: "Хорошее решение для центра. Установка заняла чуть больше времени, чем ожидали, но функционал перекрывает этот минус.", usageTime: "3 месяца" }
    ],

  },
  {
    id: "muse-bos",
    name: "ЭЭГ-БОС комплекс Muse 2",
    vendor: "NeuroLab",
    category: "bos",
    description:
      "Портативный ЭЭГ-нейроинтерфейс с биологической обратной связью: тренировка саморегуляции, устойчивости внимания и контроля возбуждения.",
    features: ["4-канальная ЭЭГ", "Протоколы саморегуляции", "Отчёты по сессиям"],
    pricePurchase: 89000,
    priceRental: 6500,
    validated: true,
    rating: 4.6,
    reviews: 88,
    ageMinMonths: 60,
    ageMaxMonths: 216,
    ovz: ["RAS", "ZPR", "typical"],
    sessions: "3 раза/неделю",
    duration: "10-15 минут",
    setup: "5 минут",
    metrics: [
      m("arousal_control", "Контроль возбуждения", "emotional", 88,
        "Arns et al. (2014) — нейрофидбек и регуляция активации"),
      m("sustained_attention", "Устойчивость внимания", "cognitive", 75,
        "Gevensleben et al. (2009) — рандомизированное исследование, n=102"),
      m("emotion_recognition", "Распознавание эмоций", "emotional", 40, "Пилот UNIVERSUM, n=31"),
    ],
    papers: [
      { title: "Neurofeedback in ADHD: a comprehensive meta-analysis of clinical efficacy", doi: "10.1177/1087054712460087", note: "мета-анализ" },
      { title: "Is neurofeedback an efficacious treatment for ADHD? A randomised controlled clinical trial", doi: "10.1007/s00787-009-0012-1", note: "n=102, p<0.001" },
    ],
    integrations: ["API v2.1", "Real-time sync"],
  },
  {
    id: "voicekeeper-ai",
    name: "VoiceKeeper AI",
    vendor: "SpeechTech",
    category: "software",
    description:
      "ИИ-тренажёр речи: автоматическая оценка звукопроизношения, фонематического слуха и объёма словаря с адаптивными заданиями.",
    features: ["Распознавание речи ребёнка", "Адаптивные логопедические маршруты", "SCORM 1.2"],
    pricePurchase: 36000,
    priceRental: 2900,
    validated: true,
    rating: 4.9,
    reviews: 214,
    ageMinMonths: 36,
    ageMaxMonths: 132,
    ovz: ["TNR", "ZPR", "RAS", "typical"],
    sessions: "5 раз/неделю",
    duration: "12 минут",
    setup: "2 минуты",
    metrics: [
      m("phonemic_hearing", "Фонематический слух", "speech", 90,
        "Bishop (2017) — цифровые тренажёры фонематического восприятия"),
      m("active_vocabulary", "Активный словарь", "speech", 72, "Пилот UNIVERSUM, n=64, p<0.01"),
      m("verbal_memory", "Слухоречевая память", "cognitive", 55, "Baddeley (2003)"),
    ],
    papers: [
      { title: "Digital speech therapy outcomes for children with speech sound disorders", doi: "10.1044/2017_JSLHR-L-16-0334", note: "n=64" },
      { title: "Automatic speech recognition in children's speech therapy", doi: "10.1016/j.csl.2016.09.004", note: "обзор технологий" },
    ],
    integrations: ["API v2.1", "SCORM 1.2", "АИС ППк"],
  },
  {
    id: "vr-social",
    name: "VR-класс «Социальные истории»",
    vendor: "ImmersiveEdu",
    category: "vr_ar",
    description:
      "VR-сценарии социального взаимодействия: магазин, поликлиника, школа. Отработка коммуникативных навыков в безопасной среде.",
    features: ["18 социальных сценариев", "Режим педагога", "Логи взаимодействий"],
    pricePurchase: 245000,
    priceRental: 15000,
    validated: false,
    rating: 4.4,
    reviews: 41,
    ageMinMonths: 84,
    ageMaxMonths: 216,
    ovz: ["RAS", "ZPR"],
    sessions: "2 раза/неделю",
    duration: "20 минут",
    setup: "10 минут",
    metrics: [
      m("social_interaction", "Социальное взаимодействие", "social", 82, "Parsons (2015) — VR и социальные навыки при РАС"),
      m("emotion_recognition", "Распознавание эмоций", "emotional", 68, "Golan & Baron-Cohen (2006)"),
      m("communication_initiative", "Инициатива в общении", "social", 60, "Пилот UNIVERSUM, n=27"),
    ],
    papers: [
      { title: "Virtually True: Exploring the potential of virtual reality for social skills training in ASD", doi: "10.1007/s10803-015-2497-3", note: "n=27" },
      { title: "Virtual reality for improving social skills in children and adolescents with autism: A systematic review", doi: "10.1016/j.chb.2018.06.014", note: "систематический обзор" },
    ],
    integrations: ["API v2.1", "Webhook"],
  },
  {
    id: "sensor-track",
    name: "Сенсорная дорожка «Тактилия»",
    vendor: "SensoryLab",
    category: "hardware",
    description:
      "Модульная сенсорная дорожка для тренировки равновесия, проприоцепции и сенсорной интеграции у детей раннего возраста.",
    features: ["12 модулей покрытий", "Датчики нагрузки", "Дневник сессий"],
    pricePurchase: 74000,
    priceRental: 4200,
    validated: true,
    rating: 4.7,
    reviews: 63,
    ageMinMonths: 12,
    ageMaxMonths: 96,
    ovz: ["DCP", "ZPR", "RAS", "typical"],
    sessions: "ежедневно",
    duration: "10 минут",
    setup: "5 минут",
    metrics: [
      m("balance", "Равновесие", "motor", 78, "Shumway-Cook (2007)"),
      m("sensory_integration", "Сенсорная интеграция", "motor", 66, "Ayres (1979)"),
      m("self_regulation", "Саморегуляция", "emotional", 42, "Пилот UNIVERSUM, n=22"),
    ],
    papers: [{ title: "Sensory integration therapy review", doi: "10.5014/ajot.2015.018051", note: "обзор" }],
    integrations: ["API v2.1"],
  },
  {
    id: "logo-table",
    name: "Логопедический стол «Лого-Про»",
    vendor: "Kidalki Systems",
    category: "hardware",
    description:
      "Интерактивный логопедический стол с зеркалом, артикуляционными играми и модулем оценки речевого дыхания.",
    features: ["Модуль речевого дыхания", "Артикуляционная гимнастика", "Отчёты для ППк"],
    pricePurchase: 320000,
    priceRental: 18000,
    validated: true,
    rating: 4.5,
    reviews: 52,
    ageMinMonths: 36,
    ageMaxMonths: 120,
    ovz: ["TNR", "ZPR", "RAS"],
    sessions: "4 раза/неделю",
    duration: "20 минут",
    setup: "20 минут",
    metrics: [
      m("articulation", "Артикуляция", "speech", 80, "Логопедические протоколы, n=38"),
      m("phonemic_hearing", "Фонематический слух", "speech", 64, "Bishop (2017)"),
      m("oral_motor", "Оральная моторика", "motor", 58, "Пилот UNIVERSUM"),
    ],
    papers: [{ title: "Articulation therapy technologies", doi: "10.1080/02699206.2018.1441436", note: "n=38" }],
    integrations: ["API v2.1", "АИС ППк"],
  },
  {
    id: "cogni-tab",
    name: "Когнитивный тренажёр «Когни-Таб»",
    vendor: "NeuroLab",
    category: "software",
    description:
      "Адаптивные когнитивные задания на рабочую память, планирование и торможение импульсов с автоматической нормировкой по возрасту.",
    features: ["Адаптивная сложность", "Возрастные нормы 0-18", "Экспорт в ИПКР"],
    pricePurchase: 24000,
    priceRental: 1900,
    validated: true,
    rating: 4.6,
    reviews: 176,
    ageMinMonths: 48,
    ageMaxMonths: 216,
    ovz: ["ZPR", "RAS", "typical"],
    sessions: "4 раза/неделю",
    duration: "15 минут",
    setup: "1 минута",
    metrics: [
      m("working_memory", "Рабочая память", "cognitive", 84, "Klingberg (2010)"),
      m("inhibitory_control", "Тормозный контроль", "cognitive", 70, "Diamond (2013)"),
      m("sustained_attention", "Устойчивость внимания", "cognitive", 62, "Пилот UNIVERSUM, n=91"),
    ],
    papers: [{ title: "Working memory training", doi: "10.1016/j.tics.2010.05.002", note: "обзор" }],
    integrations: ["API v2.1", "SCORM 1.2"],
  },
  {
    id: "emo-mirror",
    name: "Эмо-Зеркало AR",
    vendor: "ImmersiveEdu",
    category: "vr_ar",
    description:
      "AR-приложение распознавания и отработки эмоций через мимику ребёнка с обратной связью в реальном времени.",
    features: ["Трекинг мимики", "Игровые эмоциональные сценарии", "Динамика по сессиям"],
    pricePurchase: 42000,
    priceRental: 3400,
    validated: false,
    rating: 4.2,
    reviews: 29,
    ageMinMonths: 48,
    ageMaxMonths: 156,
    ovz: ["RAS", "ZPR", "typical"],
    sessions: "3 раза/неделю",
    duration: "10 минут",
    setup: "2 минуты",
    metrics: [
      m("emotion_recognition", "Распознавание эмоций", "emotional", 86, "Golan & Baron-Cohen (2006)"),
      m("self_regulation", "Саморегуляция", "emotional", 58, "Пилот UNIVERSUM, n=19"),
      m("social_interaction", "Социальное взаимодействие", "social", 44, "Parsons (2015)"),
    ],
    papers: [{ title: "Teaching emotion recognition", doi: "10.1017/S0954579406060305", note: "n=41" }],
    integrations: ["API v2.1"],
  },
  {
    id: "bos-breath",
    name: "БОС-Дыхание «Ритм»",
    vendor: "NeuroLab",
    category: "bos",
    description:
      "Тренажёр диафрагмального дыхания с БОС по вариабельности сердечного ритма: снижение тревожности и тренировка речевого выдоха.",
    features: ["Датчик ВСР", "Игровая визуализация дыхания", "Отчёт Р-1016"],
    pricePurchase: 58000,
    priceRental: 3900,
    validated: true,
    rating: 4.7,
    reviews: 74,
    ageMinMonths: 60,
    ageMaxMonths: 216,
    ovz: ["TNR", "ZPR", "typical"],
    sessions: "ежедневно",
    duration: "8 минут",
    setup: "3 минуты",
    metrics: [
      m("arousal_control", "Контроль возбуждения", "emotional", 80, "Lehrer (2013) — HRV-биофидбек"),
      m("speech_breathing", "Речевое дыхание", "speech", 68, "Логопедические протоколы"),
      m("self_regulation", "Саморегуляция", "emotional", 62, "Пилот UNIVERSUM, n=44"),
    ],
    papers: [{ title: "HRV biofeedback and anxiety", doi: "10.1007/s10484-013-9217-6", note: "n=44" }],
    integrations: ["API v2.1", "АИС ППк", "Webhook"],
  },
  {
    id: "team-quest",
    name: "Групповой квест «Команда»",
    vendor: "SensoryLab",
    category: "software",
    description:
      "Групповые кооперативные задания для развития коммуникации, соблюдения правил и совместного внимания в малой группе.",
    features: ["До 6 участников", "Роли и правила", "Аналитика по группе"],
    pricePurchase: 31000,
    priceRental: 2500,
    validated: true,
    rating: 4.3,
    reviews: 37,
    ageMinMonths: 60,
    ageMaxMonths: 180,
    ovz: ["ZPR", "RAS", "typical"],
    sessions: "2 раза/неделю",
    duration: "25 минут",
    setup: "5 минут",
    metrics: [
      m("social_interaction", "Социальное взаимодействие", "social", 84, "Kasari et al. (2010)"),
      m("joint_attention", "Совместное внимание", "social", 72, "Пилот UNIVERSUM, n=35"),
      m("communication_initiative", "Инициатива в общении", "social", 66, "Пилот UNIVERSUM"),
    ],
    papers: [{ title: "Peer-mediated interventions", doi: "10.1111/j.1469-7610.2010.02289.x", note: "n=60" }],
    integrations: ["API v2.1"],
  },
];

export const RESEARCH_BASE = [
  {
    category: "Методология",
    items: [
      { title: "Единый протокол валидации UNIVERSUM v2.1", url: "https://unvrsm.ru/legal#protocol", note: "Внутренний стандарт" },
      { title: "Матрица корреляции 5 сфер развития и МКБ-11", url: "https://unvrsm.ru/legal#matrix", note: "Методическое пособие" },
    ]
  },
  {
    category: "Клинические данные",
    items: [
      { title: "Отчёт о пилотном внедрении АИС ППк в ДОНМ (2025)", url: "https://unvrsm.ru/legal#report-2025", note: "n=450" },
      { title: "Сравнительный анализ цифровых и аналоговых средств коррекции", url: "https://unvrsm.ru/legal#comparison", note: "DOI: 10.12345/unvrsm.2026.01" },
    ]
  }
];


export type Deficit = {
  metric: string;
  metricLabel: string;
  sphere: SphereKey;
  score: number;
  level: "critical_deficit" | "below_average" | "norm";
};

export type RecommendationReason = {
  metric: string;
  metricLabel: string;
  impact: number;
  deficitScore: number;
};

export type ProductRecommendation = {
  product: Product;
  reasons: RecommendationReason[];
  score: number; // Higher means better match
};

export type Child = {
  id: string;
  name: string;
  ageMonths: number;
  ovz: string;
  spheres: Record<SphereKey, number>;
  deficits: Deficit[];
};

export const CHILDREN: Child[] = [
  {
    id: "child-2025-0042",
    name: "Дима К.",
    ageMonths: 60,
    ovz: "RAS",
    spheres: { cognitive: 48, speech: 27, emotional: 50, social: 41, motor: 22 },
    deficits: [
      { metric: "hand_eye_coordination", metricLabel: "Зрительно-моторная координация", sphere: "motor", score: 19, level: "critical_deficit" },
      { metric: "phonemic_hearing", metricLabel: "Фонематический слух", sphere: "speech", score: 25, level: "critical_deficit" },
      { metric: "arousal_control", metricLabel: "Контроль возбуждения", sphere: "emotional", score: 50, level: "below_average" },
      { metric: "social_interaction", metricLabel: "Социальное взаимодействие", sphere: "social", score: 41, level: "below_average" },
    ],
  },
  {
    id: "child-2025-0088",
    name: "Аня М.",
    ageMonths: 96,
    ovz: "ZPR",
    spheres: { cognitive: 34, speech: 52, emotional: 61, social: 58, motor: 66 },
    deficits: [
      { metric: "working_memory", metricLabel: "Рабочая память", sphere: "cognitive", score: 34, level: "critical_deficit" },
      { metric: "sustained_attention", metricLabel: "Устойчивость внимания", sphere: "cognitive", score: 40, level: "below_average" },
    ],
  },
];

export type RegionalStat = {
  region: string;
  deficits: Record<SphereKey, number>;
  totalChildren: number;
};

export const REGIONAL_STATS: RegionalStat[] = [
  {
    region: "Московская область",
    totalChildren: 1240,
    deficits: { cognitive: 32, speech: 45, emotional: 28, social: 38, motor: 22 },
  },
  {
    region: "Ленинградская область",
    totalChildren: 890,
    deficits: { cognitive: 28, speech: 40, emotional: 35, social: 30, motor: 18 },
  },
];

export const DEFICIT_LEVEL_LABEL: Record<Deficit["level"], string> = {
  critical_deficit: "Критический дефицит",
  below_average: "Ниже нормы",
  norm: "Норма",
};

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatAgeRange(minMonths: number, maxMonths: number) {
  const minYears = Math.floor(minMonths / 12);
  const maxYears = Math.floor(maxMonths / 12);
  if (minYears === maxYears) return `${minYears} лет`;
  return `${minYears}–${maxYears} лет`;
}

export function sphereProfile(product: Product): Record<SphereKey, number> {
  const result: Record<SphereKey, number> = {
    cognitive: 0,
    speech: 0,
    emotional: 0,
    social: 0,
    motor: 0,
  };
  product.metrics.forEach((m) => {
    result[m.sphere] = Math.max(result[m.sphere], m.impact);
  });
  return result;
}

/** Digital Prescription engine: match products to a child's deficits. */
export const generatePrescription = (child: Child): ProductRecommendation[] => {
  const recommendations: ProductRecommendation[] = [];

  for (const product of PRODUCTS) {
    // Check age appropriateness
    if (child.ageMonths < product.ageMinMonths || child.ageMonths > product.ageMaxMonths) {
      continue;
    }

    const reasons: RecommendationReason[] = [];
    let matchScore = 0;

    for (const deficit of child.deficits) {
      // Find a metric in the product that addresses this specific deficit
      const addressingMetric = product.metrics.find(m => m.metric === deficit.metric);
      
      if (addressingMetric && addressingMetric.impact > 40) {
        reasons.push({
          metric: deficit.metric,
          metricLabel: deficit.metricLabel,
          impact: addressingMetric.impact,
          deficitScore: deficit.score
        });

        // Scoring logic: impact * severity of deficit
        // Higher impact on a lower deficit score = higher priority
        const severity = (100 - deficit.score) / 100;
        matchScore += addressingMetric.impact * severity;
      }
    }

    if (reasons.length > 0) {
      recommendations.push({
        product,
        reasons,
        score: matchScore
      });
    }
  }

  return recommendations.sort((a, b) => b.score - a.score);
};

export function recommendedProductIds(child: Child): Set<string> {
  const ids = new Set<string>();
  const prescription = generatePrescription(child);
  for (const match of prescription) {
    ids.add(match.product.id);
  }
  return ids;
}

export const ACTIVE_DEVICES = [
  {
    productId: "voicekeeper-ai",
    metricLabel: "Фонематический слух",
    sphere: "speech" as SphereKey,
    from: 25,
    to: 42,
    trend: [25, 27, 30, 33, 36, 39, 42],
    status: "Исполняется",
  },
  {
    productId: "kidalki-wall",
    metricLabel: "Зрительно-моторная координация",
    sphere: "motor" as SphereKey,
    from: 19,
    to: 31,
    trend: [19, 20, 22, 25, 27, 29, 31],
    status: "Исполняется",
  },
  {
    productId: "bos-breath",
    metricLabel: "Контроль возбуждения",
    sphere: "emotional" as SphereKey,
    from: 50,
    to: 58,
    trend: [50, 51, 52, 54, 55, 57, 58],
    status: "Старт",
  },
];
