```mermaid
graph TD
    %% Node Styling
    classDef startEnd fill:#111,stroke:#333,stroke-width:2px,color:#fff;
    classDef question fill:#2b3a42,stroke:#3b525e,stroke-width:2px,color:#fff;
    classDef decision fill:#3b2e4a,stroke:#5c437a,stroke-width:2px,color:#fff;
    classDef reflection fill:#2d4a3e,stroke:#41705c,stroke-width:2px,color:#fff;
    classDef bridge fill:#4a3f2d,stroke:#7a6643,stroke-width:2px,color:#fff;

    %% Flow
    START([START: Good evening...]):::startEnd --> A0_OPEN[A0_OPEN: Daily momentum?]:::question
    
    A0_OPEN -->|Signals: Positive/Neutral| A0_D1{A0_D1: Routing}:::decision
    A0_OPEN -->|Signals: Frustrated/Negative| A0_D1
    
    A0_D1 -->|Positive Path| A1_Q1_GOOD[A1_Q1_GOOD: What went well?]:::question
    A0_D1 -->|Negative Path| A1_Q1_BAD[A1_Q1_BAD: Instinct when difficult?]:::question
    
    A1_Q1_GOOD --> A1_Q2[A1_Q2: Why did work get done?]:::question
    A1_Q1_BAD --> A1_Q2
    
    A1_Q2 --> A1_Q3[A1_Q3: Effort vs External factors?]:::question
    
    A1_Q3 --> A1_D1{A1_D1: Evaluate Axis 1 Signals}:::decision
    
    A1_D1 -->|Internal >= External| A1_REF_INT[A1_REF_INT: Agency reflection]:::reflection
    A1_D1 -->|Internal < External| A1_REF_EXT[A1_REF_EXT: Circumstance reflection]:::reflection
    
    A1_REF_INT --> BRIDGE_1_2[BRIDGE_1_2: Shift to Orientation]:::bridge
    A1_REF_EXT --> BRIDGE_1_2
    
    BRIDGE_1_2 --> A2_Q1[A2_Q1: Approach to helping?]:::question
    A2_Q1 --> A2_Q2[A2_Q2: Mindset after tedious task?]:::question
    A2_Q2 --> A2_Q3[A2_Q3: Extra hour of free time?]:::question
    
    A2_Q3 --> A2_D1{A2_D1: Evaluate Axis 2 Signals}:::decision
    
    A2_D1 -->|Contribution >= Entitlement| A2_REF_CONTRIB[A2_REF_CONTRIB: Giving value]:::reflection
    A2_D1 -->|Contribution < Entitlement| A2_REF_ENTITLE[A2_REF_ENTITLE: Protecting energy]:::reflection
    
    A2_REF_CONTRIB --> BRIDGE_2_3[BRIDGE_2_3: Shift to Radius]:::bridge
    A2_REF_ENTITLE --> BRIDGE_2_3
    
    BRIDGE_2_3 --> A3_Q1[A3_Q1: Prioritizing whose experience?]:::question
    A3_Q1 --> A3_Q2[A3_Q2: Meeting off track monologue?]:::question
    A3_Q2 --> A3_Q3[A3_Q3: End of day thought?]:::question
    
    A3_Q3 --> A3_D1{A3_D1: Evaluate Axis 3 Signals}:::decision
    
    A3_D1 -->|Altrocentric >= Selfcentric| A3_REF_ALTRO[A3_REF_ALTRO: Wide radius]:::reflection
    A3_D1 -->|Altrocentric < Selfcentric| A3_REF_SELF[A3_REF_SELF: Narrow radius]:::reflection
    
    A3_REF_ALTRO --> SUMMARY[SUMMARY: Final synthesis]:::startEnd
    A3_REF_SELF --> SUMMARY
    
SUMMARY --> END([END: Session Complete]):::startEnd