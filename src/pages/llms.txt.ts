import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const text = `# egoic.ai — Tom Prior

Hackathon builds.

## Projects

### Alethiea
Pāṭala Research CI — continuous verification for agentic science.

When OpenAIRE evidence changes, agent conclusions break.
Alethiea detects the blast radius and emits proof obligations.

Language: Python
GitHub: https://github.com/prx0r/Alethiea
Hackathon: OpenAIRE AI Hackathon 2026

#### Problem
OpenAIRE agents draw conclusions from scholarly metadata. When that metadata changes,
conclusions silently break. There is no continuity layer for agent reasoning across
evidence updates.

#### Solution
Records which OpenAIRE observations a conclusion depends on. Detects when those
observations change. Emits proof obligations for affected conclusions. Leaves
unaffected ones untouched.

#### Architecture
- Observation → derived claim → explicit dependency
- Source changes → blast radius computed
- Affected: PROOF OBLIGATION
- Unaffected: NO ACTION NEEDED

#### Tech Stack
- Python
- OpenAIRE MCP
- Alien Intelligence
- ScholeXplorer V3

---

### Iolaus
MemoryProof — benchmark and debugger for graph memory systems.

Tests whether HydraDB recall returns attributable, temporally correct,
cross-source consistent context.

Language: Python
GitHub: https://github.com/prx0r/Iolaus
Hackathon: Hack Hydra 2026

#### Problem
Agent memory systems retrieve plausible context. Nobody systematically tests
whether it is actually correct, attributable, or consistent.

#### Solution
Exports a verified scholarly corpus as ground truth, generates benchmark questions
with known answers, runs them through HydraDB in both modes, and produces a failure
taxonomy with 9 categories of memory errors.

#### Architecture
- Wiggly verified corpus → HydraDB export
- Auto-generated questions (factual, multi-hop, contradiction, temporal)
- HydraDB evaluation (fast + thinking modes)
- Failure taxonomy (9 error categories)
- Auto-tune Hydra config via evolutionary optimizer

#### Tech Stack
- Python
- HydraDB
- Cypher
- Knowledge Graphs
- Benchmarking
`;

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
