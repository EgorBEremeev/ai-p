# Шаблон-конфигуратор Искусственного Субъекта (Иерархический)
> **Version 1.4** | **Date: 11.02.2026**

## Инструкция по заполнению
При конфигурации частной модели используйте следующие обозначения:
*   `+`  — Компонент включен (Present)
*   `∅`  — Компонент отсутствует (Absent)
*   `-`  — Компонент не участвует / Не применимо (Not Involved)
*   Для параметров с выбором (в квадратных скобках `[]`) указывайте конкретное значение из домена.

| Слой / Параметр / [Домен] | Модель: [A] | Модель: [B] | Модель: [C] |
| :--- | :---: | :---: | :---: |
| **L1: Когнитивный субстрат [Present, Absent]** | | | |
| ├─ Мозг (Brain) `[Present, Absent]` | | | |
| └─ Инструменты (Tools) `[Present, Absent, MCP-compatible, Hard-coded]` | | | |
| **L2: Слой Поведения [Present, Absent]** | | | |
| ├─ **Когнитивное Управление (CC) [Present, Absent]** | | | |
| │  ├─ Control Type `[Детерминированный, Event-driven, Стохастический выбор, Адаптивный]` | | | |
| │  ├─ Sync Mode `[Barriers, Asynchronous]` | | | |
| │  └─ **Clock [Present, Absent]** | | | |
| │     ├─ CognitiveClock `[Present, Absent]` | | | |
| │     └─ ClockState `[Present, Absent]` | | | |
| ├─ **Коннектом [Present, Absent]** | | | |
| │  ├─ Type `[None, Explicit, Implicit, Full]` | | | |
| │  └─ WeightDynamics `[None, Static, Modulated]` | | | |
| └─ **Функциональная Ячейка (ФЯ) [Present, Absent]** | | | |
|    ├─ Intent `[Present, Absent]` | | | |
|    ├─ **AfferentialPolicy [Present, Absent]** | | | |
|    │  ├─ ClockState (Situational) `[None, Direct, Policy, Both]` | | | |
|    │  └─ Memory (Experience) `[Present, Absent]` | | | |
|    ├─ **EfferentialPolicy [Present, Absent]** | | | |
|    │  ├─ SubjectiveContext `[None, ClockState, Frame, Both]` | | | |
|    │  └─ TargetSubstrate `[Brain, Tools]` | | | |
|    ├─ **SubjectivityPolicy [Present, Absent]** | | | |
|    │  ├─ Attribution `[ClockState, Frame]` | | | |
|    │  └─ Experience `[Brain_Output, Tools_Output, ALL]` | | | |
|    └─ ResultAcceptor `[None, Built-in]` | | | |
| **L3: Слой Субъектности [Present, Absent]** | | | |
| ├─ **Synthesis (Afferential) [Present, Absent]** | | | |
| │  ├─ Motivation (Intent) `[Present, Absent]` | | | |
| │  ├─ Trigger (CC-Pulse) `[Present, Absent]` | | | |
| │  ├─ Situational (ClockState) `[Present, Absent]` | | | |
| │  └─ Memory (PMA) `[Present, Absent]` | | | |
| ├─ **PMA (Mnemonics) [Present, Absent]** | | | |
| │  └─ SelectionDepth `[None, Episodic, Applied, Procedural]` | | | |
| ├─ Ego-Afferentation `[Present, Absent]` | | | |
| ├─ **Consolidation [Present, Absent]** | | | |
| │  ├─ EpisodicTimeConsolidation `[Present, Absent]` | | | |
| │  ├─ AppliedConsolidation `[Present, Absent]` | | | |
| │  ├─ ProceduralConsolidation `[Present, Absent]` | | | |
| │  └─ ConsolidationPolicy `[Present, Absent]` | | | |
| ├─ Кадр (Frame) `[Present, Absent]` | | | |
| └─ **SubjectiveExperience [Present, Absent]** | | | |
|    ├─ **MemoryLayers [Present, Absent]** | | | |
|    │  ├─ Episodic `[Recency-only, Unlimited]` | | | |
|    │  ├─ Applied `[Present, Absent]` | | | |
|    │  └─ Procedural `[Present, Absent]` | | | |
| **L4: Слой Эволюции [Present, Absent]** | | | |
| ├─ **FunctionalSystem [Present, Absent]** | | | |
| │  ├─ Concurrency `[1:1, 1:m]` | | | |
| │  └─ **ResultAcceptor [Present, Absent]** | | | |
| │     ├─ Model `[None, Internal, External]` | | | |
| │     └─ Mechanism `[None, Internal, External]` | | | |
| └─ **FeedbackAfferentation [Present, Absent, Manual]** | | | |
|    ├─ FC_Components `[not affected, affected]` | | | |
|    ├─ Connectome_Explicit `[not affected, affected]` | | | |
|    ├─ Connectome_Implicit `[not affected, affected]` | | | |
|    ├─ SubjExp_ConsolidationPolicy `[not affected, affected]` | | | |
|    ├─ CC_Strategies `[not affected, affected]` | | | |
|    ├─ FS_Acceptors `[not affected, affected]` | | | |
|    └─ ConflictResolutionPolicy `[None, Present]` | | | |
| **LM: Слой Морфологии [Present, Absent]** | | | |
| └─ **SubjectMorphology [Present, Absent]** <br> Nature `[Carrier]` | | | |
