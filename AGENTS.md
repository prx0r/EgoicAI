# AGENTS.md — global rules for egoic.ai

## design principles

### minimalism
- no borders, no lines, no hover effects, no animations
- no decorative elements unless explicitly requested
- white background, black text, source code pro font
- if in doubt, remove it

### typography
- all text lowercase unless it is a proper noun or technical term
- no exclamation marks
- no emojis
- no "welcome" or "about me" language
- short, sharp, factual sentences

### layout
- big logos (160px) on the left, text on the right
- full width, no max-width containers
- no cards, no tiles, no grid borders
- content should breathe but not feel empty

### color
- background: #fff
- text: #000
- muted: #999
- problem label: #8b4545 (dull red)
- solution label: #4a6b4a (dull green)
- links: #000 with subtle underline on hover only

## content rules

### project descriptions
- problem and solution are single phrases, not bullet points
- no technical jargon unless necessary
- write like explaining to a smart 5 year old
- one sentence problem, one sentence solution
- no "we" or "our" — just the facts

### greek etymology
- show on hover only (title attribute)
- never display underneath the name
- format: "greek word — meaning"

### links
- hackathon names link to official hackathon sites
- github links to repo
- stack items are plain text, not links (unless on project page)
- no "read more" or "learn more" text

### email
- copy on click with "copied" feedback
- no animation, no burst effect
- just the text feedback

## technical rules

### deployment
- cloudflare pages
- always clear dist/ before build
- always verify deployment with curl
- always commit and push after deploy

### fonts
- source code pro only
- load via google fonts link tag
- never use astro fonts api (it does not generate font files)

### images
- cache bust with ?v=N parameter
- store in public/images/
- use r2 for storage when possible

### code style
- no comments unless asked
- no unnecessary variables
- inline styles preferred over css files
- keep it simple

## communication

### when reporting back
- state what was done, not what you are about to do
- include the live url
- be concise — no preamble, no postamble
- if something fails, say what failed and why

### when asking questions
- be specific about what you need
- no "would you like me to..." — just ask the question
- offer options if there are choices to make

### never
- add features not requested
- add effects not requested
- add text not requested
- change styling not requested
- "improve" things without being asked
