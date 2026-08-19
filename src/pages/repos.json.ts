import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = {
    site: 'egoic.ai',
    author: 'Tom Prior',
    context: 'OpenAIRE AI Hackathon 2026 build',
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
    ],
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
