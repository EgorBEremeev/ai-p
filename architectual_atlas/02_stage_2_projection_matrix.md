# ЭТАП 2 — Матрица проекции параметров AI-P в архитектурные домены

> **AI-P Architectural Atlas** | Артефакт этапа 2
> Версия: 2.0 | Дата формирования: 03.03.2026

---

## 1. Назначение матрицы

Матрица устанавливает **системное соответствие** между каждым параметром параметрической концептуальной модели AI-P и архитектурными доменами Атласа. Для каждого параметра указаны:

- **основной домен** — домен, в котором данный параметр формирует первичный архитектурный вопрос;
- **связанные домены** — домены, на которые параметр оказывает влияние через архитектурные зависимости;
- **архитектурные следствия** — какие проектные решения обусловлены данным параметром;
- **контекстные зависимости** — случаи, когда проекция параметра зависит от значений других параметров.

---

## 2. Основная матрица проекции

### L1: Слой Когнитивного Субстрата

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `L1.status` | Present, Absent | AD-01 | — | Наличие вычислительной среды; при Absent субъект невозможен |
| `Brain` | Present, Absent | AD-01 | AD-10, AD-11 | Определяет наличие семантического процессора; Brain используется FeedbackAfferentation для анализа |
| `Tools` | Present, Absent | AD-01 | AD-06 | Определяет наличие сенсорно-моторных интерфейсов; влияет на EfferentialPolicy.TargetSubstrate |

### L2: Слой Поведения — Когнитивное Управление

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `CC.status` | Present, Absent | AD-02 | AD-04, AD-05 | Наличие управления активацией ФЯ; определяет пусковую афферентацию |
| `control_type` | Present | AD-02 | AD-10 | Тип управления (детерм./событ./стох./адапт.); адаптивный требует SE.Procedural |
| `SynchronizationMode` | Present | AD-02 | AD-04 | Барьерная или асинхронная синхронизация; влияет на параллелизм когнитивных актов |
| `CognitiveClock` | Present, Absent | AD-02 | AD-07 | Наличие дискретизации времени; отсутствие исключает ClockState |
| `ClockState` | Present, Absent | AD-02 | AD-05, AD-07, AD-08 | «Подпись субъекта» (минимальная); фактор обстановочной афферентации; элемент SEU |

### L2: Слой Поведения — Афферентный Синтез

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `AfferentialSynthesis.status` | Present, Absent | AD-05 | AD-08 | Наличие процесса формирования контекста; без него невозможен Frame |

### L2: Слой Поведения — Коннектом

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `Connectome.status` | Present, Absent | AD-03 | AD-04 | Наличие пространства траекторий поведения |
| `Connectome.type` | None, Explicit, Implicit, Both | AD-03 | AD-07, AD-10 | **Explicit:** жёсткие переходы. **Implicit:** через SE (требует AD-07). **Both:** полная топология. Тип определяет объекты коррекции в AD-10 |

### L2: Слой Поведения — Функциональная Ячейка

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `FC.status` | Present, Absent | AD-04 | AD-03 | Наличие атомарных единиц поведения; узлы коннектома |
| `Intent` | Present, Absent | AD-04 | AD-05 | Мотивационный фактор афферентного синтеза |
| `AfferentialPolicy.status` | Present, Absent | AD-04 | AD-05, AD-08 | Определяет, управляет ли ФЯ формированием контекста |
| `AfferentialPolicy.ClockState` | None, Direct, Policy, Both | AD-04, AD-05 | AD-02, AD-07, AD-08 | **Ключевой параметр субъектности.** None→Direct: зарождение субъектности. Direct→Policy: ретроспекция (требует SE). Policy→Both: интегральная субъектность. Контекстная зависимость: Policy/Both требует SE и PMA |
| `AfferentialPolicy.Memory` | Present, Absent | AD-05 | AD-07, AD-08 | Участие PMA в афферентном синтезе; требует SubjectiveExperience |
| `EfferentialPolicy.status` | Present, Absent | AD-04 | AD-06 | Определяет наличие эфферентного контура в ФЯ |
| `EfferentialPolicy.SubjectiveContext` | None, ClockState, Frame, Both | AD-06 | AD-05, AD-08 | Какой контекст включается в эфферентный акт; зависит от наличия Frame |
| `EfferentialPolicy.TargetSubstrate` | Brain, Tools | AD-06 | AD-01 | Направление эфферентного акта (когнитивный vs. моторный) |
| `SubjectivityPolicy.status` | Present, Absent | AD-04 | AD-08 | Определяет, сохраняется ли опыт акта |
| `SubjectivityPolicy.Attribution` | ClockState, Frame | AD-08 | AD-04, AD-07 | Полнота «подписи субъекта» в единице опыта |
| `SubjectivityPolicy.Experience` | Brain_Output, Tools_Output | AD-06, AD-08 | AD-07 | Какие результаты сохраняются в опыте |
| `ResultAcceptor` (FC) | None, Built-in | AD-04 | — | Наличие структурного акцептора результата когнитивного акта |

### L3: Слой Субъектности — Процессы

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `PMA.status` | Present, Absent | AD-08 | AD-05, AD-07 | Наличие механизма проекции опыта; обеспечивает фактор Memory в синтезе |
| `PMA.SelectionDepth` | None, Episodic, Applied, Procedural, Values | AD-08 | AD-05, AD-07, AD-09 | Глубина привлечения памяти; зависит от наличия соответствующих слоёв в AD-07; контекстная зависимость: Applied требует AppliedConsolidation (AD-09) |
| `EgoAfferentation` | Present, Absent | AD-08 | AD-07 | Наличие механизма присвоения опыта; без него опыт не сохраняется |
| `Consolidation.status` | Present, Absent | AD-09 | AD-07, AD-08 | Наличие процессов трансформации опыта между слоями памяти |
| `EpisodicTimeConsolidation` | Present, Absent | AD-09 | AD-07 | Построение эпизодов высшего порядка |
| `AppliedConsolidation` | Present, Absent | AD-09 | AD-07 | Трансформация эпизодов в знания; требует MemoryLayers.applied |
| `ProceduralConsolidation` | Present, Absent | AD-09 | AD-07, AD-10 | Трансформация знаний в навыки; требует MemoryLayers.procedural; контекстная зависимость: адаптивный CC (AD-02) требует ProceduralConsolidation |
| `ConsolidationPolicy` | Present, Absent | AD-09 | AD-10 | Политики консолидации; объект коррекции при эволюции |

### L3: Слой Субъектности — Формы

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `Frame` | Present, Absent | AD-08 | AD-04, AD-05 | Наличие «кадра сознания»; требует AfferentialSynthesis и PMA |
| `SubjectiveExperience.status` | Present, Absent | AD-07 | AD-03, AD-08, AD-09, AD-10 | Центральный параметр; при Absent невозможны: неявный коннектом, PMA, консолидация, ФС |
| `episodic.status` | Present, Absent | AD-07 | AD-08 | Наличие эпизодического слоя; базовый слой памяти |
| `episodic.Depth` | Recency-only, Unlimited | AD-07 | AD-08 | Глубина эпизодической памяти; Recency-only ограничивает PMA |
| `applied.status` | Present, Absent | AD-07 | AD-08, AD-09 | Наличие прикладного слоя; требует AppliedConsolidation |
| `procedural.status` | Present, Absent | AD-07 | AD-02, AD-08, AD-09 | Наличие процедурного слоя; требует ProceduralConsolidation; требуется для адаптивного CC |
| `values.status` | Present, Absent | AD-07 | — | Наличие ценностного слоя (зарезервировано) |

### L4: Слой Эволюции

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `L4.status` | Present, Absent | AD-10 | — | Наличие слоя эволюции; при Absent субъект статичен |
| `FunctionalSystem.status` | Present, Absent | AD-10 | AD-03 | Наличие адаптивных контуров; требует L3 (SubjectiveExperience) |
| `FS.Concurrency` | 1:1, 1:m | AD-10 | — | Принадлежность ФЯ к ФС: эксклюзивная или множественная |
| `ResultAcceptor.status` (FS) | Present, Absent | AD-10 | — | Наличие эталонов для эволюционной оценки |
| `ResultAcceptor.ResultModel` | None, Internal, External | AD-10 | — | Источник эталона: внешний (Manual) или внутренний (Auto/Full) |
| `ResultAcceptor.ComparisonMechanism` | None, Internal, External | AD-10 | AD-01 | Механизм сравнения; Internal использует Brain |
| `FeedbackAfferentation.status` | Absent, Manual, Self | AD-10 | все AD | Режим эволюции; определяет автономность самоизменения |
| `CorrectionObjects.FC_Components` | not affected, affected | AD-10 | AD-04 | Пластичность политик ФЯ |
| `CorrectionObjects.Connectome_Explicit` | not affected, affected | AD-10 | AD-03 | Динамика явных связей коннектома |
| `CorrectionObjects.Connectome_Implicit` | not affected, affected | AD-10 | AD-03 | Динамика неявных связей коннектома |
| `CorrectionObjects.SubjExp_ConsolidationPolicy` | not affected, affected | AD-10 | AD-09 | Пластичность политик консолидации |
| `CorrectionObjects.CC_Strategies` | not affected, affected | AD-10 | AD-02 | Пластичность стратегий управления |
| `CorrectionObjects.FS_Acceptors` | not affected, affected | AD-10 | — | Пластичность эталонов ФС |
| `ConflictResolutionPolicy` | None, Present | AD-10 | — | Разрешение конкурентных сигналов при 1:m |

### LM: Слой Морфологии

| Параметр | ОДЗ | Основной домен | Связанные домены | Архитектурные следствия |
|----------|-----|---------------|-----------------|------------------------|
| `LM.status` | Present, Absent | AD-11 | — | Наличие структурного субстрата |
| `SubjectMorphology.nature` | Carrier | AD-11 | AD-10 | Носитель всех структурных элементов; среда применения эволюционных изменений |

---

## 3. Множественные проекции

Ряд параметров имеет проекцию в несколько доменов одновременно. Это не является дефектом, а отражает интегративную природу модели AI-P.

| Параметр | Домены | Характер множественной проекции |
|----------|--------|---------------------------------|
| `AfferentialPolicy.ClockState` | AD-04, AD-05, AD-02, AD-07, AD-08 | Определяет структуру ФЯ (AD-04), режим синтеза (AD-05), связь с CC (AD-02), состав SEU (AD-07), полноту атрибуции (AD-08) |
| `SubjectivityPolicy.*` | AD-04, AD-06, AD-08, AD-07 | Структурный компонент ФЯ (AD-04), трассировка результата (AD-06), механизм присвоения (AD-08), содержание опыта (AD-07) |
| `ClockState` | AD-02, AD-05, AD-07, AD-08 | Порождается CC (AD-02), фактор синтеза (AD-05), элемент SEU (AD-07), элемент атрибуции (AD-08) |
| `SubjectiveExperience` | AD-07, AD-03, AD-08, AD-09, AD-10 | Хранение опыта (AD-07), среда неявных связей (AD-03), источник для PMA (AD-08), объект консолидации (AD-09), объект анализа ФС (AD-10) |
| `PMA.SelectionDepth` | AD-08, AD-05, AD-07 | Механизм проекции (AD-08), глубина контекста синтеза (AD-05), зависимость от слоёв памяти (AD-07) |
| `EfferentialPolicy.*` | AD-04, AD-06 | Структурный компонент ФЯ (AD-04), детальный механизм трансляции (AD-06) |

---

## 4. Контекстные зависимости проекции

Для ряда параметров архитектурная интерпретация зависит от значений других параметров:

| Параметр | Зависимость | Следствие |
|----------|-------------|-----------|
| `AfferentialPolicy.ClockState = Policy/Both` | Требует `SubjectiveExperience = Present`, `PMA = Present` | Ретроспективный режим невозможен без памяти и проекции |
| `Connectome.type = Implicit/Both` | Требует `SubjectiveExperience = Present` | Неявные связи опосредованы опытом |
| `PMA.SelectionDepth = Applied` | Требует `applied.status = Present`, `AppliedConsolidation = Present` | Глубина проекции ограничена наличием консолидированных слоёв |
| `PMA.SelectionDepth = Procedural` | Требует `procedural.status = Present`, `ProceduralConsolidation = Present` | Аналогично для процедурного слоя |
| `control_type = Адаптивный` | Требует `procedural.status = Present` | Адаптивное управление требует навыков |
| `FunctionalSystem = Present` | Требует `L3 = Present` | ФС анализируют субъективный опыт |
| `FeedbackAfferentation = Self` | Требует `FunctionalSystem = Present` | Автономная коррекция требует адаптивных контуров |
| `FS.Concurrency = 1:m` | Требует `ConflictResolutionPolicy = Present` | Конкуренция ФС за ФЯ требует политики разрешения |

---

## 5. Проекция семейств субъектов в домены

### Матрица активации доменов по семействам

| Домен | A | B1 | B2 | B3 | B4 | C | D | E | F |
|-------|---|----|----|----|----|---|---|---|---|
| **AD-01** Когнитивный субстрат | Brain | Brain | Brain | Brain | Brain | Brain+Tools | Brain+Tools | Brain+Tools | Brain+Tools |
| **AD-02** Когнитивное управление | Базовый | +Clock | +Clock | +Clock | +Async | +Async | +Async | +Адапт. | +Адапт. |
| **AD-03** Коннектом | Explicit | Explicit | Implicit | Implicit | Implicit | Implicit | Implicit | Full | Full |
| **AD-04** Функциональная ячейка | Минимальный | +AP(Direct) | +AP(Policy) | +SP(Frame) | +AP(Both) | Полный | Полный | Полный | Полный |
| **AD-05** Афферентный контекст | — | Базовый | +PMA(Ep) | +PMA(Ep) | +PMA(Ep) | +PMA(App) | +PMA(App) | +PMA(Proc) | +PMA(Proc) |
| **AD-06** Эфферентная реализация | Базовый | Базовый | Базовый | +SubjCtx | +SubjCtx | +Tools | +Tools | +Tools | +Tools |
| **AD-07** Опыт и память | — | Recency | Ep(Rec/Unl) | Ep(Unl) | Ep(Unl) | +Applied | +Applied | +Procedural | +Procedural |
| **AD-08** Проекция опыта | — | Минимальный | +PMA | +Frame attr. | +Both | Полный | Полный | Полный | Полный |
| **AD-09** Консолидация | — | — | — | — | — | Ep+App | Ep+App | +Proc | +Proc |
| **AD-10** Эволюция | — | — | — | — | — | — | Manual | Auto | Full |
| **AD-11** Морфология | Carrier | Carrier | Carrier | Carrier | Carrier | Carrier | +Модиф. | +Модиф. | +Модиф. |

*Легенда:* `—` = домен неактивен; `+X` = домен активен с расширением X; `Полный` = все возможности домена задействованы.

### Эволюционные переходы: какие домены активируются / усложняются

| Переход | Граница | Активируемые / усложняемые домены |
|---------|---------|----------------------------------|
| A → B1 | I: ClockState Direct | AD-02 (+Clock), AD-05 (базовый синтез), AD-07 (Recency), AD-08 (минимальный) |
| B1 → B2 | II: ClockState Policy | AD-05 (+PMA), AD-07 (+Episodic), AD-08 (+PMA), AD-03 (→Implicit) |
| B2 → B3 | III: +Frame Attribution | AD-08 (Frame атрибуция), AD-04 (+SubjectivityPolicy.Frame), AD-06 (+SubjCtx) |
| B3 → B4 | IV: ClockState Both | AD-02 (+Async), AD-04 (AP.Both), AD-08 (интегральная субъектность) |
| B4 → C | V: +Applied Memory | AD-07 (+Applied), AD-09 (появление), AD-01 (+Tools), AD-05 (+PMA.Applied), AD-06 (+Tools) |
| C → D | VI: +L4 Manual | AD-10 (появление, Manual), AD-11 (+модифицируемость) |
| D → E | VII: L4 Auto | AD-10 (→Auto, расширение CorrObj), AD-02 (+Адаптивный), AD-07 (+Procedural), AD-09 (+ProceduralConsol.) |
| E → F | VIII: L4 Full | AD-10 (→Full, +CC_Strategies, +FS_Acceptors, +ConflictResolution, 1:m) |

---

## 6. Заключение

Матрица проекции устанавливает полное и явное соответствие между параметрическим пространством AI-P и 11 архитектурными доменами Атласа v2.0:

- **Полнота:** Все параметры имеют проекцию минимум в один домен.
- **Множественные проекции:** Зафиксированы и обоснованы для 6 ключевых параметров.
- **Контекстные зависимости:** 8 правил зависимости интерпретации от значений других параметров.
- **Семейства:** Матрица активации показывает, как домены «включаются» и усложняются при эволюционных переходах между семействами A–F.
- **Эфферентный домен (AD-06):** Корректно отражает активацию — базовый уровень у всех семейств, расширяется с появлением SubjectiveContext (B3+) и Tools (C+).

Прямых переходов к Solution-уровню в матрице не содержится.

---

*Основание: params_AI-P.yaml v1.4.1, architectural_domains.md (Этап 1 v2.0), AI-P_bm_11022026_claude_opus_g_pro_3.md v1.4.2*
