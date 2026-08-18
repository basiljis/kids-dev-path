# **EduKit Navigator**

создать Маркетплейс оборудования и цифровых решений для психолого-педагогического сопровождения детей на основе 5 блоков 
Вот максимально подробный и структурированный промпт (ТЗ), который вы можете скопировать и вставить в **lovable.dev** (или любой другой AI-билдер, например, v0, Bolt.new). Он составлен так, чтобы ИИ понял контекст, архитектуру, дизайн и бизнес-логику UNIVERSUM.

---

#  ПРОМПТ ДЛЯ LOVABLE.DEV: МАРКЕТПЛЕЙС UNIVERSUM

**Role & Context:**

Ты — эксперт в разработке сложных B2B2C SaaS-платформ и EdTech-маркетплейсов. Твоя задача — создать фронтенд и бэкенд (через Supabase) для маркетплейса **UNIVERSUM**. 

Это не просто интернет-магазин. Это платформа исполнения «Цифровых рецептов», где оборудование и цифровые тренажеры привязаны к конкретным дефицитам развития ребенка, выявленным в АИС ППк-Помощник (психолого-педагогический консилиум). Система должна соответствовать требованиям Распоряжения Р-1016 (мониторинг исполнения рекомендаций).

**Tech Stack:**

- Frontend: React, Vite, TypeScript, Tailwind CSS.

- UI Components: Shadcn UI, Lucide React Icons.

- Charts: Recharts (для радарных графиков и динамики).

- Backend/DB: Supabase (PostgreSQL, Auth, Edge Functions).

- State Management: Zustand or React Query.

---

##  1. ДИЗАЙН-СИСТЕМА И UX

**Стиль:** "Medical-pedagogical but friendly". Чистый, доверительный, без "больничного холода".

**Цветовая палитра:**

- Primary: `#1E3A8A` (Глубокий синий — доверие, наука).

- Background: `#F8FAFC` (Светло-серый).

- Сферы развития (для бейджей и графиков):

  - 🧠 Когнитивное: `#7C3AED` (Фиолетовый)

  - 🗣 Речевое: `#F97316` (Оранжевый)

  - ❤️ Эмоциональное: `#EC4899` (Розовый)

  - 🤝 Социальное: `#10B981` (Зеленый)

  - 🏃 Моторное: `#06B6D4` (Голубой)

- Статусы дефицитов: 🔴 `#EF4444` (Критический), 🟠 `#F59E0B` (Ниже нормы), 🟢 `#10B981` (Норма).

**Типографика:** Inter или Manrope (чистые, современные гротески).

---

##  2. СТРУКТУРА БАЗЫ ДАННЫХ (SUPABASE SCHEMA)

Создай следующие таблицы в Supabase:

```sql

-- Пользователи

CREATE TABLE users (

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  email TEXT UNIQUE NOT NULL,

  role TEXT CHECK (role IN ('parent', 'vendor', 'admin', 'pedagogue')),

  full_name TEXT,

  organization_name TEXT, -- для B2B/B2G

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);

-- Дети (профили)

CREATE TABLE children (

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  parent_id UUID REFERENCES users(id),

  full_name TEXT NOT NULL,

  birth_date DATE NOT NULL,

  diagnosis_code TEXT, -- например, F84.0 (РАС)

  ovz_category TEXT,

  ppk_protocol_id UUID -- ссылка на протокол из АИС ППк

);

-- Метрики развития (5 сфер)

CREATE TABLE metrics (

  id UUID PRIMARY KEY,

  name TEXT NOT NULL, -- например, 'hand_eye_coordination'

  sphere TEXT NOT NULL, -- 'motor', 'cognitive', etc.

  age_norms JSONB -- хранит нормы по месяцам

);

-- Товары (Оборудование и ПО)

CREATE TABLE products (

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  vendor_id UUID REFERENCES users(id),

  name TEXT NOT NULL,

  category TEXT NOT NULL, -- 'hardware', 'software', 'vr_ar', 'bos'

  description TEXT,

  price_purchase INTEGER, -- в рублях

  price_rental_monthly INTEGER,

  images TEXT[],

  validation_status TEXT DEFAULT 'pending', -- 'validated', 'pending', 'rejected'

  age_min_months INT,

  age_max_months INT,

  ovz_compatibility TEXT[] -- ['RAS', 'ZPR', 'typical']

);

-- Маппинг товаров на метрики (Ключевая таблица!)

CREATE TABLE product_metrics (

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  product_id UUID REFERENCES products(id),

  metric_id UUID REFERENCES metrics(id),

  impact_intensity INT CHECK (impact_intensity BETWEEN 0 AND 100), -- Сила влияния 0-100%

  scientific_basis TEXT, -- Ссылка на исследования

  measurement_method TEXT

);

-- Заказы и Аренда

CREATE TABLE orders (

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id UUID REFERENCES users(id),

  child_id UUID REFERENCES children(id),

  product_id UUID REFERENCES products(id),

  type TEXT CHECK (type IN ('purchase', 'rental')),

  status TEXT DEFAULT 'pending',

  total_amount INT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);

```

---

## 🛒 3. КЛЮЧЕВЫЕ СТРАНИЦЫ И ФУНКЦИОНАЛ

### Страница 1: Каталог (Marketplace Grid) `/marketplace`

**Layout:** Sidebar слева (фильтры), Grid справа (карточки).

**Sidebar Filters (Обязательно реализовать):**

1. **Сферы развития:** Чекбоксы с иконками (Когнитивное, Речевое, Эмоциональное, Социальное, Моторное).

2. **Тип оборудования:** Hardware, Software, VR/AR, БОС-тренажеры, Интерактивные поверхности.

3. **Возраст:** Range slider (от 0 до 18 лет).

4. **Категория ОВЗ:** Чекбоксы (РАС F84.0, ЗПР, ТНР, ДЦП, Без ОВЗ).

5. **Статус валидации:** "✅ Валидировано UNIVERSUM", "🔄 На проверке".

6. **Цена:** Range slider.

**Product Card (Карточка товара):**

- Изображение (aspect-video).

- Бейджи: "Рекомендовано ППк" (если совпадает с профилем ребенка), "Валидировано".

- Название и Вендор.

- **Мини-радар (Recharts):** Показывает, на какие 5 сфер влияет устройство.

- **Ключевые метрики:** Список (например, "Улучшает `hand_eye_coordination` на 85%").

- Цена: Покупка / Аренда в месяц.

- Кнопка: "Добавить в рецепт" / "Подробнее".

### Страница 2: Детальная карточка товара `/marketplace/:id`

**Layout:** 2 колонки (70% контент, 30% sticky sidebar с ценой).

**Контент (Левая колонка):**

1. Галерея изображений и видео.

2. Блок "Влияние на развитие": Интерактивный радарный график (5 осей).

3. Таблица метрик:

   | Метрика API | Влияние | Научное обоснование |

   |---|---|---|

   | `hand_eye_coordination` | 85% | Sugden & Chambers (2005)... |

4. Блок "Совместимость с UNIVERSUM": Иконки API, SCORM, интеграция с АИС ППк.

5. Научная база (Accordion): Список статей с DOI, результаты пилотных исследований (n=47, p<0.05).

**Sidebar (Правая колонка):**

- Табы: "Покупка", "Аренда", "Подписка".

- Если пользователь авторизован и у ребенка есть дефицит: Блок "🎯 Рекомендовано для вашего ребенка" с прогнозом прогресса (было 19% -> станет 55% через 12 недель).

- Кнопка "Оформить заказ".

### Страница 3: Личный кабинет родителя (Digital Prescription) `/parent/dashboard`

**Главный экран:**

1. Приветствие и селектор детей.

2. **Блок "Мой Цифровой рецепт":**

   - Радарный график текущего состояния ребенка (данные из АИС ППк).

   - Список рекомендованных устройств, отсортированный по приоритету (от самых критичных дефицитов).

   - Карточка рекомендации: Дефицит ( Критический), Метрика, Устройство, Прогноз улучшения, Кнопка "Заказать".

3. **Блок "Мои устройства и прогресс":**

   - Таблица активных устройств.

   - Спарклайны (мини-графики) динамики метрик (например, `phonemic_hearing` растет от 25% к 42%).

   - Статус соответствия Р-1016 (Мониторинг исполнения рекомендаций ПМПК).

### Страница 4: Кабинет производителя (Vendor Onboarding) `/vendor/add-product`

Многошаговая форма (Stepper):

1. Базовая инфо и медиа.

2. Ценообразование.

3. **API Mapping (Критически важно):**

   - Для каждой из 5 сфер показать список метрик.

   - Слайдер `impact_intensity` (0-100) для каждой выбранной метрики.

   - Текстовое поле "Как именно устройство влияет" и "Метод измерения".

4. Научное обоснование (загрузка PDF, ввод DOI).

5. Технические требования и интеграция (чекбоксы: "Есть API", "Webhook ready").

---

## 🔌 4. API И ИНТЕГРАЦИЯ С АИС ППк-ПОМОЩНИК

Создай документацию/страницу `/api-docs` или реализуй логику через Supabase Edge Functions.

**Сценарий интеграции (Digital Prescription Engine):**

1. **Входные данные (от АИС ППк-Помощник):**

   АИС ППк генерирует JSON с результатами протокола (на основе Карты ОВЗ):

   ```json

   {

     "child_id": "child-2025-0042",

     "age_months": 60,

     "diagnosis": "F84.0",

     "deficits": [

       { "metric": "hand_eye_coordination", "score": 19, "level": "critical_deficit" },

       { "metric": "phonemic_hearing", "score": 25, "level": "critical_deficit" },

       { "metric": "arousal_control", "score": 50, "level": "below_average" }

     ]

   }

   ```

2. **Edge Function (Логика подбора):**

   Напиши Supabase Edge Function `generate-prescription`, которая:

   - Принимает массив `deficits`.

   - Делает запрос к таблице `product_metrics`, ища товары, где `impact_intensity > 60` для этих метрик.

   - Фильтрует по возрасту и категории ОВЗ.

   - Сортирует по `impact_intensity DESC`.

   - Возвращает сгенерированный "Цифровой рецепт".

3. **Обратная связь (Мониторинг Р-1016):**

   Когда ребенок занимается на устройстве, устройство (или педагог) отправляет данные через API:

   ```http

   POST /api/v1/devices/:id/metrics

   ```

   Payload:

   ```json

   {

     "child_id": "child-2025-0042",

     "metric": "hand_eye_coordination",

     "new_score": 42,

     "timestamp": "2025-07-03T14:30:00Z"

   }

   ```

   Система обновляет профиль ребенка и генерирует отчет для ППк о том, что рекомендация Р-1016 исполнена и есть положительная динамика.

---

## 🛠 5. ПОШАГОВЫЙ ПЛАН РЕАЛИЗАЦИИ ДЛЯ LOVABLE

**Шаг 1: Инициализация и Базовый UI**

- Настрой Tailwind с кастомными цветами UNIVERSUM.

- Создай Layout (Header с навигацией: Каталог, Для производителей, Наука, ЛК).

- Сверстай Hero-секцию на главной: "Цифровой рецепт развития вашего ребенка".

**Шаг 2: База данных и Моки**

- Создай таблицы в Supabase (используй SQL из раздела 2).

- Засидь (seed) базу данных 10-15 тестовыми товарами (например, "Интерактивная стена Кидалки", "ЭЭГ-БОС Muse 2", "VoiceKeeper AI") и привяжи их к метрикам.

**Шаг 3: Каталог и Фильтрация**

- Реализуй страницу `/marketplace`.

- Подключи фильтры из Sidebar к запросам Supabase.

- Сверстай адаптивную сетку карточек товаров.

**Шаг 4: Детальная страница и Визуализация**

- Реализуй `/marketplace/:id`.

- Интегрируй `Recharts` для отрисовки радарного графика влияния на 5 сфер.

- Добавь блок с научными ссылками.

**Шаг 5: Личный кабинет и "Цифровой рецепт"**

- Создай страницу `/parent/dashboard`.

- Замокай данные профиля ребенка (как в Карте ОВЗ для Димы: дефициты по моторике и речи).

- Реализуй алгоритм (на фронтенде или через Edge Function), который подсвечивает товары из каталога, закрывающие эти дефициты.

**Шаг 6: Формы и Онбординг**

- Создай многошаговую форму для производителей `/vendor/add-product`.

- Реализуй динамическое добавление маппинга метрик (слайдеры интенсивности).

---

## ⚠️ ВАЖНЫЕ ЗАМЕЧАНИЯ ДЛЯ AI (Lovable)

1. **Адаптивность:** 70% родителей будут заходить с мобильных телефонов. Фильтры в каталоге на мобильных должны открываться в Bottom Sheet (нижней шторке).

2. **Доступность (Accessibility):** Соблюдай WCAG 2.1 AA. Контрастность текста, навигация с клавиатуры (важно для гос. и соц. проектов).

3. **Производительность:** Используй `React.lazy` для тяжелых компонентов (графики Recharts). Изображения товаров должны быть оптимизированы.

4. **Безопасность:** Данные детей (ОВЗ, диагнозы) — это персональные данные (152-ФЗ). В UI никогда не показывай диагнозы в открытых карточках, только в защищенном ЛК.

---

*Скопируйте этот текст полностью в чат Lovable.dev. Он даст ИИ полное понимание бизнес-логики, структуры данных и визуальных требований для создания рабочего прототипа маркетплейса UNIVERSUM.*

=== 8. DATABASE SCHEMA ===

Tables:

users

id (UUID)

email

password_hash

role: "parent|vendor|admin|pedagogue"

created_at

children

id (UUID)

parent_id (FK → users)

full_name

date_of_birth

diagnosis (ICD-10 code)

ovz_category

created_at

ppk_protocols

id (UUID)

child_id (FK → children)

date

metrics (JSONB)

conclusion

recommendations

products

id (UUID)

vendor_id (FK → users)

name

category

description

price_purchase

price_rental

validation_status: "pending|validated|rejected"

created_at

product_metrics

id (UUID)

product_id (FK → products)

metric_name

impact_intensity (0-100)

scientific_basis (JSONB)

orders

id (UUID)

child_id (FK → children)

product_id (FK → products)

user_id (FK → users)

type: "purchase|rental|subscription"

status: "pending|paid|shipped|delivered"

total_amount

created_at

device_measurements

id (UUID)

child_id (FK → children)

product_id (FK → products)

session_id

metric_name

raw_scores (JSONB)

normalized_score

timestamp

БЛОК "СОВМЕСТИМОСТЬ С UNIVERSUM" ===

   

   Section Title: "Интеграция с экосистемой"

   

   Features:

   - ✅ Автоматическая передача данных в карту ребенка

   - ✅ Объективный мониторинг прогресса

   - ✅ Интеграция с АИС ППк-Помощник

   - ✅ Соответствие Р-1016 (мониторинг исполнения рекомендаций)

   

   API Badge:

   - "API v2.1 compatible"

   - "SCORM 1.2 support"

   - "Real-time data sync"

   

   Data Flow Diagram:

   [Device] → [UNIVERSUM API] → [Child Card] → [PPK Report]

=== БЛОК "КАКИЕ ДЕФИЦИТЫ ЗАКРЫВАЕТ" ===

   

   Section Title: "Влияние на развитие ребенка"

   

   Radar Chart (interactive):

   - 5 axes: Когнитивное, Речевое, Эмоциональное, Социальное, Моторное

   - Scale: 0-100%

   - Show impact_intensity for each sphere

   

   Metrics Table:

   | Метрика | Влияние | Научное обоснование |

   |---------|---------|---------------------|

   | hand_eye_coordination | 85% | Sugden & Chambers (2005) - игровые тренировки улучшают координацию на 40% |

   | gross_motor | 70% | Lange et al. (2012) - Kinect-терапия улучшает моторику |

   | bilateral_integration | 60% | Burtsev (2019) - межполушарное взаимодействие |

   

   Progress Simulation (interactive):

   - Slider: "Текущий уровень: [19%] ━━━━━○━━━━━ [100%]"

   - Show: "Через 12 недель: → 55% (переход в категорию 'Ниже нормы')"

   - Graph: Projected improvement curve

6. === БЛОК "НАУЧНОЕ ОБОСНОВАНИЕ" ===

   

   Section Title: "Научная база"

   

   Accordion:

   - "Исследования эффективности"

     - List of scientific papers with links (DOI)

     - Meta-analyses

     - Clinical trials

   

   - "Методология измерения"

     - How device measures metrics

     - Algorithms description

     - Validation protocol

   

   - "Сравнение с золотым стандартом"

     - Correlation coefficient: r = 0.82

     - Accuracy: 87%

     - Sample size: n=150 children

1. Image Gallery:

   - Main image (800x600px)

   - Thumbnails (4-6 images)

   - Video preview (if available)

2. Product Header:

   - Title (h1)

   - Vendor badge (clickable → vendor profile)

   - Validation badge:

     - ✅ "Валидировано UNIVERSUM" (green)

     - 🔄 "На валидации" (yellow)

   - Rating: ⭐⭐⭐⭐⭐ 4.8 (127 отзывов)

3. Quick Stats (4 columns):

   - Age: "5-10 лет"

   - Sessions: "3-5 раз/неделю"

   - Duration: "15-20 минут"

   - Setup: "15 минут"

4. Description:

   - Full product description (rich text)

   - Key features (bulleted list)

5. === БЛОК "КАКИЕ ДЕФИЦИТЫ ЗАКРЫВАЕТ" ===

   

   Section Title: "Влияние на развитие ребенка"

   

   Radar Chart (interactive):

   - 5 axes: Когнитивное, Речевое, Эмоциональное, Социальное, Моторное

   - Scale: 0-100%

   - Show impact_intensity for each sphere

   

   Metrics Table:

   | Метрика | Влияние | Научное обоснование |

   |---------|---------|---------------------|

   | hand_eye_coordination | 85% | Sugden & Chambers (2005) - игровые тренировки улучшают координацию на 40% |

   | gross_motor | 70% | Lange et al. (2012) - Kinect-терапия улучшает моторику |

   | bilateral_integration | 60% | Burtsev (2019) - межполушарное взаимодействие |

   

   Progress Simulation (interactive):

   - Slider: "Текущий уровень: [19%] ━━━━━○━━━━━ [100%]"

   - Show: "Через 12 недель: → 55% (переход в категорию 'Ниже нормы')"

   - Graph: Projected improvement curve

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kids-dev-path.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8139cf84-eae4-496b-bc79-be1efc5803ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
