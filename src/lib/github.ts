export interface Repo {
  name: string;
  slug: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  updated: string;
  topics: string[];
  readme?: string;
}

export async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch(
    'https://api.github.com/users/prx0r/repos?per_page=100&sort=updated'
  );
  const data = await res.json();

  return data
    .filter((r: any) =>
      !r.fork &&
      r.description &&
      r.description.trim() !== '' &&
      r.private === false
    )
    .map((r: any) => ({
      name: r.name,
      slug: r.name.toLowerCase(),
      description: r.description,
      language: r.language || 'Unknown',
      stars: r.stargazers_count,
      url: r.html_url,
      updated: r.updated_at.split('T')[0],
      topics: r.topics || [],
    }));
}

export async function fetchRepoBySlug(slug: string): Promise<Repo | null> {
  const repos = await fetchRepos();
  return repos.find((r) => r.slug === slug) || null;
}

export async function fetchReadme(owner: string, repo: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers: { Accept: 'application/vnd.github.v3.raw' } }
    );
    if (!res.ok) return '';
    return await res.text();
  } catch {
    return '';
  }
}
