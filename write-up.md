The Daily Reflection Tree: Designing Deterministic Workflows for Cognitive Growth
1. Why These Specific Questions?
A reflection tool only works if the user feels safe being honest. If questions feel like a compliance test, users will game the system to achieve the "correct" or "good employee" outcome. To prevent this, the questions in this tree were designed around actual human workflows and friction points, rather than abstract psychological concepts.

Instead of asking, "Do you feel entitled?" (which triggers defensive mechanics), the questions observe granular, end-of-day realities—like what a user does with an unexpected extra hour, or what their internal monologue sounds like during an off-track meeting.

The fixed options are intentionally crafted to validate the left side of the axes (Victim/Entitlement/Self-Centric). For example, choosing to "protect my energy" or feeling frustrated by external blockers is framed as a natural survival mechanism, not a failure. By removing the moral weight from the options, the tool captures a highly accurate read of the user's cognitive state.

2. Branching Design and Trade-Offs
Designing the tree required balancing psychological nuance with deterministic constraints. I opted for a signal-tallying architecture over a highly fragmented, infinite-branching model.

The Trade-Off: Routing a user into a completely different line of questioning after every single choice can create a disjointed experience and exponentially increase the data overhead.

The Solution: The tree utilizes a steady, centralized spine. The flow branches temporarily at the start to contextualize the user's mood (validating a "good" vs "bad" day), but then relies on a consistent sequence of questions. The system accumulates signals silently in the background. Decision nodes at the end of each axis evaluate these aggregated signals to deliver a highly contextual reflection.

This approach ensures the system remains auditable, the JSON schema remains clean and parsable for a full-stack implementation, and the user experiences a cohesive, cinematic narrative arc rather than a disjointed interrogation.

3. Psychological Grounding
The architecture sequences three distinct psychological domains to mirror the natural expansion of human awareness:

Axis 1 (Locus of Control - Rotter): The tree first establishes the baseline of agency. Until a user recognizes their internal locus of control, they cannot effectively evaluate their impact on others.

Axis 2 (Organizational Citizenship Behavior - Organ): Once agency is established, the tree shifts to the application of that agency. It measures the tension between psychological entitlement and voluntary contribution, looking for signs of discretionary effort.

Axis 3 (Perspective-Taking & Self-Transcendence - Maslow/Batson): The final axis widens the lens entirely. Rooted in Maslow’s later work on transcendence, it tests whether the user contextualizes their daily friction within a larger ecosystem (altrocentrism) or isolates it within their own stress (self-centrism).

4. Future Iterations
With more time, this static decision tree could be evolved into a richer, longitudinal product:

Historical State Management: I would implement a database schema (such as MongoDB) to persist the axis signals over time. The summary nodes could then interpolate data across weeks (e.g., "You leaned into agency today, a shift from last week where external factors felt heavier").

Enhanced UI/UX: The interface would be designed with a vibe-oriented, ethereal aesthetic—using soft lighting cues and smooth transitions—to make the end-of-day reflection feel like a calming ritual rather than an enterprise software task.

Dynamic Node Generation (At Build Time): While the runtime must remain deterministic, LLMs could be used in the build pipeline to generate hundreds of highly specific, role-tailored question nodes, allowing the static JSON to serve a much wider variety of organizational contexts.