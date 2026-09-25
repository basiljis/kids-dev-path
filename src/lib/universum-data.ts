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
  papers: { title: string; doi: string; note: string; summary?: string; findings?: string[]; lang?: "ru" | "en"; journal?: string }[];
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
      { 
        title: "Вмешательство в моторные навыки у детей с расстройством координации развития", 
        doi: "10.1016/j.ridd.2005.03.003", findings: ["Игровые моторные задания улучшают крупную моторику и координацию", "Эффект выше при регулярных занятиях 2–3 раза в неделю", "Подходит для детей с ДЦП, ЗПР и РАС как часть комплексной программы"], 
        note: "n=150, r = 0.82",
        summary: "Исследование подтверждает, что систематическое использование интерактивных игровых механик достоверно улучшает показатели крупной моторики и зрительно-моторной координации у детей. Уровень доказательности А."
      },
      { 
        title: "Реабилитационные игры на базе Kinect для детей с нарушениями моторики", 
        doi: "10.1109/EMBC.2012.6346663", findings: ["Бесконтактные сенсоры повышают мотивацию к упражнениям", "Растут точность движений и скорость реакции", "Игровой формат снижает утомляемость на занятиях"], 
        note: "n=47, p<0.05",
        summary: "Анализ эффективности бесконтактных сенсоров в реабилитации. Результаты показывают значимый прирост в точности движений и скорости реакции в экспериментальной группе."
      },
      { 
        title: "Моторная координация и адаптивное поведение у детей с РАС", 
        doi: "10.3389/fpsyg.2018.02350", findings: ["Трудности моторной координации у детей с РАС связаны с адаптивным поведением", "Развитие моторики может поддерживать бытовые и социальные навыки", "Моторную сферу важно включать в оценку и план сопровождения"], 
        note: "n=22",
        summary: "Статья фокусируется на преодолении дефицитов межполушарного взаимодействия через билатеральные упражнения в виртуальной среде."
      },
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
      { title: "Нейрофидбек при СДВГ: комплексный мета-анализ клинической эффективности", doi: "10.1177/1087054712460087", findings: ["Снижаются невнимательность и импульсивность при СДВГ", "Эффект сохраняется после окончания курса", "Метод рекомендован как дополнительный к основной терапии"], note: "мета-анализ", summary: "Мета-анализ подтверждает значимое снижение невнимательности и импульсивности у детей с СДВГ после курса нейрофидбек-тренировок." },
      { title: "Является ли нейрофидбек эффективным методом лечения СДВГ? Рандомизированное контролируемое клиническое исследование", doi: "10.1111/j.1469-7610.2008.02033.x", findings: ["Нейрофидбек эффективнее контрольного тренинга внимания", "Улучшения отметили и родители, и педагоги", "Курс около 36 занятий"], note: "n=102, p<0.001", summary: "РКИ (n=102): нейрофидбек превзошёл контрольный тренинг внимания по снижению симптомов СДВГ по оценкам родителей и педагогов." },
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
    papers: [{"title": "Особенности речи при расстройствах аутистического спектра", "doi": "10.17759/autdd.2017150304", "note": "обзор, 2017", "journal": "Аутизм и нарушения развития", "lang": "ru", "summary": "Обзор российских и зарубежных исследований о развитии и использовании речи при РАС, включая особенности восприятия речи на фоне сенсорных особенностей.", "findings": ["Экспрессивная речь при РАС имеет характерные особенности", "Трудности чаще связаны с коммуникативным использованием речи", "Сенсорные особенности влияют на восприятие речи"]}, 
      { title: "Эффективность и интенсивность коррекции у детей с нарушениями звукопроизношения", doi: "10.1044/1092-4388(2012/11-0076)", findings: ["Частота занятий влияет на скорость коррекции звуков", "Важно число правильных повторений на занятии", "Цифровые тренажёры помогают увеличить интенсивность"], note: "n=64", summary: "Показано, что регулярные интенсивные занятия ускоряют коррекцию звукопроизношения; важны частота и число повторений." },
      { title: "Распознавание детской речи: генеративное расширение данных", doi: "10.1109/asru46091.2019.9003933", findings: ["Детская речь сложнее для автоматического распознавания, чем речь взрослых", "Расширение обучающих данных повышает точность", "Это основа надёжных логопедических приложений"], note: "обзор технологий", summary: "Работа описывает методы повышения точности автоматического распознавания детской речи — основы цифровых логопедических тренажёров." },
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
      { title: "Виртуальная реальность: потенциал обучения социальным навыкам при РАС", doi: "10.1007/s10803-015-2497-3", findings: ["VR-тренинг улучшил распознавание эмоций", "Выросли навыки ведения беседы", "Участники охотно занимались в виртуальной среде"], note: "n=27", summary: "Тренинг социальных навыков в виртуальной реальности улучшил распознавание эмоций и навыки общения у молодых людей с РАС." },
      { title: "Виртуальная реальность для улучшения социальных навыков у детей и подростков с аутизмом: систематический обзор", doi: "10.1016/j.chb.2018.06.014", findings: ["VR даёт безопасную среду для отработки социальных ситуаций", "Большинство работ показывают прирост социальных навыков", "Нужны исследования долгосрочного эффекта"], note: "систематический обзор", summary: "Систематический обзор: VR-вмешательства дают устойчивый прирост социальных и коммуникативных навыков у детей и подростков с аутизмом." },
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
    papers: [{"title": "Расстройства аутистического спектра через призму сенсомоторной коррекции", "doi": "10.17759/cpse.2018070315", "note": "рецензия, 2018", "journal": "Клиническая и специальная психология", "lang": "ru", "summary": "Рецензия на пособие Т.Г. Горячевой и Ю.В. Никитиной о методе сенсомоторной коррекции детей с РАС — отечественной технологии работы через тело и движение.", "findings": ["Сенсомоторная коррекция — признанный российский подход при РАС", "Работа идёт от телесных и двигательных упражнений к высшим функциям", "Пособие адресовано психологам, дефектологам и родителям"]}, { title: "Обзор терапии сенсорной интеграции", doi: "10.5014/ajot.2015.018051", findings: ["Сенсорная интеграция помогает достигать индивидуальных целей ребёнка", "Снижаются сенсорные трудности в быту", "Лучший эффект — при работе по протоколу"], note: "обзор", summary: "Обзор подтверждает эффективность сенсорной интеграции для достижения индивидуальных целей и снижения сенсорных трудностей у детей." }],
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
    papers: [{"title": "Логопедическая работа с младшими школьниками с РАС и интеллектуальными нарушениями", "doi": "10.17759/autdd.2020180108", "note": "методика, 2020", "journal": "Аутизм и нарушения развития", "lang": "ru", "summary": "Описаны этапы логопедической работы с детьми с РАС и нарушением интеллекта, особое внимание — мотивационному этапу и организации среды.", "findings": ["Начинать нужно с мотивационного этапа и подготовки среды", "Задачи подбираются по уровню речевого развития ребёнка", "Работа ведётся комплексно вместе с другими специалистами"]}, { title: "Ультразвуковая визуальная обратная связь в артикуляционной терапии детей", doi: "10.1111/1460-6984.70209", findings: ["Визуальная обратная связь ускоряет постановку звуков", "Эффективна при стойких нарушениях речи", "Результаты переносятся в спонтанную речь"], note: "n=38", summary: "Мета-анализ: ультразвуковая визуальная обратная связь улучшает точность артикуляции у детей с устойчивыми нарушениями речи." }],
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
    papers: [{ title: "Тренировка рабочей памяти", doi: "10.1016/j.tics.2010.05.002", findings: ["Тренировка улучшает выполнение заданий на рабочую память", "Перенос на другие навыки ограничен", "Важно сочетать с развитием учебных навыков"], note: "обзор", summary: "Обзор показывает, что тренировка рабочей памяти улучшает выполнение тренируемых задач; перенос на другие навыки требует контроля." }],
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
    papers: [{ title: "Обучение распознаванию эмоций", doi: "10.1017/S0954579406060305", findings: ["Распознавание эмоций можно целенаправленно тренировать", "Навык связан с социальной адаптацией ребёнка", "Раннее обучение даёт лучший результат"], note: "n=41", summary: "Изучены механизмы распознавания эмоций у детей и эффективность обучения чтению мимики и эмоциональных сигналов." }],
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
    papers: [{ title: "Биофидбек ВСР и тревожность", doi: "10.1007/s10484-013-9217-6", findings: ["Дыхательный биофидбек снижает тревожность", "Улучшается способность к саморегуляции", "Метод прост в домашнем применении"], note: "n=44", summary: "Биофидбек вариабельности сердечного ритма снижает уровень тревожности и улучшает саморегуляцию." }],
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
    papers: [{"title": "Социально-коммуникативная компетентность младших школьников с ЗПР", "doi": "10.17759/pse.2019240307", "note": "дети 7–8 лет, 2019", "journal": "Психологическая наука и образование", "lang": "ru", "summary": "Исследование совместной деятельности детей 7–8 лет с ЗПР: выявлены трудности договориться, распределить действия, следовать плану и разрешать конфликты.", "findings": ["У детей с ЗПР снижены навыки договора и совместного планирования", "Нужна специально организованная образовательная среда", "Принципы среды согласованы с ФГОС НОО для обучающихся с ОВЗ"]}, { title: "Peer-mediated interventions", doi: "10.1111/j.1469-7610.2010.02289.x", findings: ["Вовлечение сверстников повышает социальную активность детей с РАС", "Эффект заметен в школьной среде", "Важна подготовка сверстников-помощников"], note: "n=60", summary: "Вмешательства с участием сверстников улучшили социальную вовлечённость детей с РАС в школьной среде." }],
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
    region: "Алтайский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Амурская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Архангельская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Астраханская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Белгородская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Брянская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Владимирская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Волгоградская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Вологодская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Воронежская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Еврейская автономная область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Забайкальский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ивановская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Иркутская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Кабардино-Балкарская Республика",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Калининградская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Калужская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Камчатский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Карачаево-Черкесская Республика",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Кемеровская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Кировская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Костромская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Краснодарский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Красноярский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Курганская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Курская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ленинградская область",
    totalChildren: 890,
    deficits: { cognitive: 28, speech: 40, emotional: 35, social: 30, motor: 18 },
  },
  {
    region: "Липецкая область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Магаданская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Мурманская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ненецкий автономный округ",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Нижегородская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Новгородская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Новосибирская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Омская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Оренбургская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Орловская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Пензенская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Пермский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Приморский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Псковская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Адыгея",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Алтай",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Башкортостан",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Бурятия",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Дагестан",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Ингушетия",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Калмыкия",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Карелия",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Коми",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Крым",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Марий Эл",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Мордовия",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Саха (Якутия)",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Северная Осетия — Алания",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Татарстан",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Тыва",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Республика Хакасия",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ростовская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Рязанская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Самарская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Саратовская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Сахалинская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Свердловская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Севастополь",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Смоленская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ставропольский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Тамбовская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Тверская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Томская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Тульская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Тюменская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Удмуртская Республика",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ульяновская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Хабаровский край",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ханты-Мансийский автономный округ — Югра",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Челябинская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Чеченская Республика",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Чувашская Республика",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Чукотский автономный округ",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ямало-Ненецкий автономный округ",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "Ярославская область",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "г. Москва",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
  },
  {
    region: "г. Санкт-Петербург",
    totalChildren: 0,
    deficits: { cognitive: 0, speech: 0, emotional: 0, social: 0, motor: 0 },
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
