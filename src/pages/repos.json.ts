import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = {
    site: 'egoic.ai',
    author: 'Tom Prior',
    context: 'Hackathon builds',
    repos: [
      {
        name: 'Alethiea',
        slug: 'alethiea',
        description: 'Pāṭala Research CI — continuous verification for agentic science',
        language: 'Python',
        stars: 0,
        url: 'https://github.com/prx0r/Alethiea',
        updated: '2026-08-19',
        hackathon: 'OpenAIRE AI Hackathon 2026',
        problem:
          'OpenAIRE agents draw conclusions from scholarly metadata. When that metadata changes, conclusions silently break. There is no continuity layer for agent reasoning across evidence updates.',
        solution:
          'Records which OpenAIRE observations a conclusion depends on. Detects when those observations change. Emits proof obligations for affected conclusions. Leaves unaffected ones untouched.',
        architecture: [
          'Observation → derived claim → explicit dependency',
          'Source changes → blast radius computed',
          'Affected: PROOF OBLIGATION',
          'Unaffected: NO ACTION NEEDED',
        ],
        techStack: ['Python', 'OpenAIRE MCP', 'Alien Intelligence', 'ScholeXplorer V3'],
      },
      {
        name: 'Iolaus',
        slug: 'iolaus',
        description: 'MemoryProof — benchmark and debugger for graph memory systems',
        language: 'Python',
        stars: 0,
        url: 'https://github.com/prx0r/Iolaus',
        updated: '2026-08-19',
        hackathon: 'Hack Hydra 2026',
        problem:
          'Agent memory systems retrieve plausible context. Nobody systematically tests whether it is actually correct, attributable, or consistent.',
        solution:
          'Exports a verified scholarly corpus as ground truth, generates benchmark questions with known answers, runs them through HydraDB in both modes, and produces a failure taxonomy with 9 categories of memory errors.',
        architecture: [
          'Wiggly verified corpus → HydraDB export',
          'Auto-generated questions (factual, multi-hop, contradiction, temporal)',
          'HydraDB evaluation (fast + thinking modes)',
          'Failure taxonomy (9 error categories)',
          'Auto-tune Hydra config via evolutionary optimizer',
        ],
        techStack: ['Python', 'HydraDB', 'Cypher', 'Knowledge Graphs', 'Benchmarking'],
      },
    ],
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
