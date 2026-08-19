import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const text = `# egoic.ai — Tom Prior

OpenAIRE AI Hackathon 2026 build.

## Project

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
`;

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
