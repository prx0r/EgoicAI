# PROCESS.md — adding a new project to egoic.ai

## prerequisites

- github PAT: `$GITHUB_PAT` (set as environment variable)
- cloudflare account ID: `$CF_ACCOUNT_ID` (set as environment variable)
- cloudflare pages project: `egoic-ai`
- cloudflare API token: `$CF_API_TOKEN` (set as environment variable — R2 only, cannot manage pages or DNS)
- R2 access key: `$R2_ACCESS_KEY` (set as environment variable)
- R2 secret key: `$R2_SECRET_KEY` (set as environment variable)
- R2 endpoint: `$R2_ENDPOINT` (set as environment variable)
- working directory: `/tmp/EgoicAI-fresh`
- git remote: `https://github.com/prx0r/EgoicAI.git`

## step 1: gather project info

```
required:
- project name (capitalized, e.g. "Alethiea")
- slug (lowercase, e.g. "alethiea")
- greek name (e.g. "ἀλήθεια")
- greek meaning (one phrase, e.g. "the unconcealment of what was hidden")
- problem (one sentence, lowercase, e.g. "ai agent conclusions become stale when their source evidence changes")
- solution (one sentence, lowercase, e.g. "tracks which evidence each conclusion depends on and flags the ones that broke")
- stack (3 items max, each with name, url to github repo, color hex)
- hackathon name (lowercase)
- hackathon URL (official site)
- github URL (repo link)
- logo image (png, uploaded to R2 bucket `qdw/`)
- duration (e.g. "12 weeks")
- prize (e.g. "€500")
- status (e.g. "submitted")
```

### verification

```
check:
- [ ] all fields present
- [ ] problem is one sentence
- [ ] solution is one sentence
- [ ] stack items link to github repos not websites
- [ ] logo image exists in R2 bucket qdw/
```

## step 2: download logo from R2

```bash
AWS_ACCESS_KEY_ID=$R2_ACCESS_KEY \
AWS_SECRET_ACCESS_KEY=$R2_SECRET_KEY \
aws s3 cp "s3://qdw/{logo-filename}.png" "/tmp/EgoicAI-fresh/public/images/{slug}-logo.png" \
--endpoint-url $R2_ENDPOINT
```

### verification

```
check:
- [ ] file exists at /tmp/EgoicAI-fresh/public/images/{slug}-logo.png
- [ ] file size > 0 bytes
- [ ] file is valid PNG (python3 -c "from PIL import Image; Image.open('/tmp/EgoicAI-fresh/public/images/{slug}-logo.png').verify()")
```

## step 3: update index.astro

open `/tmp/EgoicAI-fresh/src/pages/index.astro`

add new project to the `projects` array:

```javascript
{
  name: '{Name}',
  slug: '{slug}',
  greek: '{greek}',
  meaning: '{meaning}',
  problem: '{problem}',
  solution: '{solution}',
  stack: [
    { name: '{name}', url: '{github-url}', color: '{hex-color}' },
  ],
  hackathon: '{hackathon-name}',
  hackathonUrl: '{hackathon-url}',
  github: '{github-url}',
  logo: '/images/{slug}-logo.png?v=6',
  duration: '{duration}',
  prize: '{prize}',
  status: '{status}',
},
```

### verification

```
check:
- [ ] file parses without syntax errors (npm run build succeeds)
- [ ] new project appears in the projects array
- [ ] logo path matches step 2 output
- [ ] all strings are lowercase (except name, greek)
```

## step 4: update project page template

open `/tmp/EgoicAI-fresh/src/pages/project/[slug].astro`

add new entry to `getStaticPaths()` return array:

```javascript
{
  params: { slug: '{slug}' },
  props: {
    name: '{Name}',
    greek: '{greek}',
    meaning: '{meaning}',
    problem: '{problem}',
    solution: '{solution}',
    stack: [
      { name: '{name}', url: '{github-url}', color: '{hex-color}' },
    ],
    hackathon: '{hackathon-name}',
    hackathonUrl: '{hackathon-url}',
    github: '{github-url}',
    logo: '/images/{slug}-logo.png?v=6',
    duration: '{duration}',
    prize: '{prize}',
    status: '{status}',
    video: null,
  },
},
```

### verification

```
check:
- [ ] file parses without syntax errors
- [ ] new slug appears in getStaticPaths
- [ ] props match index.astro data exactly
```

## step 5: update llms.txt.ts

open `/tmp/EgoicAI-fresh/src/pages/llms.txt.ts`

add new project section to the text string:

```
### {Name}
{problem}

{solution}

Language: Python
GitHub: {github-url}
Hackathon: {hackathon-name}
```

### verification

```
check:
- [ ] file parses without syntax errors
- [ ] new project name appears in the text
```

## step 6: update repos.json.ts

open `/tmp/EgoicAI-fresh/src/pages/repos.json.ts`

add new entry to the `repos` array:

```javascript
{
  name: '{Name}',
  slug: '{slug}',
  description: '{problem} — {solution}',
  language: 'Python',
  stars: 0,
  url: '{github-url}',
  updated: '{YYYY-MM-DD}',
  hackathon: '{hackathon-name}',
  problem: '{problem}',
  solution: '{solution}',
  architecture: [],
  techStack: ['{stack-item-1}', '{stack-item-2}', '{stack-item-3}'],
},
```

### verification

```
check:
- [ ] file parses without syntax errors
- [ ] JSON output is valid (curl https://egoic.ai/repos.json | python3 -m json.tool)
```

## step 7: update sitemap.xml.ts

open `/tmp/EgoicAI-fresh/src/pages/sitemap.xml.ts`

add new URL entry:

```xml
<url>
  <loc>https://egoic.ai/project/{slug}</loc>
  <lastmod>{YYYY-MM-DD}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>
```

### verification

```
check:
- [ ] file parses without syntax errors
- [ ] new URL appears in sitemap
```

## step 8: clean dist and build

```bash
rm -rf /tmp/EgoicAI-fresh/dist
cd /tmp/EgoicAI-fresh && npm run build
```

### verification

```
check:
- [ ] build completes without errors
- [ ] dist/ directory exists
- [ ] dist/index.html exists
- [ ] dist/project/{slug}/index.html exists
- [ ] grep "{project-name}" dist/index.html returns results
```

## step 9: deploy to cloudflare pages

```bash
cd /tmp/EgoicAI-fresh && \
CLOUDFLARE_API_TOKEN=$CF_API_TOKEN \
npx wrangler pages deploy dist --project-name=egoic-ai
```

### verification

```
check:
- [ ] deployment succeeds (output shows "Deployment complete")
- [ ] new deployment URL is returned
- [ ] curl -s -o /dev/null -w "%{http_code}" https://egoic.ai returns 200
- [ ] curl -s -o /dev/null -w "%{http_code}" https://egoic.ai/project/{slug} returns 200
```

## step 10: commit and push to github

```bash
cd /tmp/EgoicAI-fresh && \
git add -A && \
git commit -m "{commit-message}" && \
git push origin main
```

### verification

```
check:
- [ ] git status shows clean working tree
- [ ] git log shows new commit
- [ ] git push succeeds
- [ ] https://github.com/prx0r/EgoicAI shows new commit
```

## step 11: final verification

```bash
# check main site
curl -s https://egoic.ai | grep "{project-name}"

# check project page
curl -s https://egoic.ai/project/{slug} | grep "{project-name}"

# check repos.json
curl -s https://egoic.ai/repos.json | python3 -c "import sys,json; data=json.load(sys.stdin); print([r['name'] for r in data['repos']])"

# check llms.txt
curl -s https://egoic.ai/llms.txt | grep "{project-name}"

# check sitemap
curl -s https://egoic.ai/sitemap.xml | grep "{slug}"
```

### verification

```
check:
- [ ] project name appears on main site
- [ ] project page loads correctly
- [ ] project appears in repos.json
- [ ] project appears in llms.txt
- [ ] project appears in sitemap.xml
- [ ] all links work (hackathon, github, stack)
- [ ] logo loads correctly
```

## common issues

### build fails
- check for syntax errors in modified files
- ensure all props match between index.astro and project/[slug].astro
- ensure stack items have name, url, color properties

### deployment fails
- verify cloudflare API token has pages permission (cfat_ token is R2 only)
- check wrangler is logged in or token is valid
- ensure dist/ was cleaned before build

### images not updating
- increment ?v=N parameter in logo path
- clear dist/ and rebuild
- check image exists in public/images/

### project page returns 404
- ensure slug in getStaticPaths matches the URL
- rebuild after adding to getStaticPaths
- check dist/project/{slug}/index.html exists
