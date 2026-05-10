# claude-prompts

> One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.

**Status:** v0.1 — ready to use.

**Sovereignty:** sovereign-by-construction. Local markdown files. No cloud, no login, no telemetry.

---

## What this is

Power users maintain prompts across Claude Projects, Cursor rules (.cursorrules), Cline rules, AGENTS.md, Continue config, Aider conventions, ChatGPT custom instructions, and more. Each tool wants its own format. Updates drift. The same prompt exists in five places, slightly different.

claude-prompts treats one local markdown library as canonical and syncs into the others.

## What this isn't

- Not a prompt evaluator
- Not a prompt marketplace
- Not a team collaboration tool in v0.1

See [PRD-v1.md](./PRD-v1.md) for the full anti-scope definition.

---

## Install

### From npm (when published)

```bash
npm install -g claude-prompts
```

### From source

**Prerequisites:**
- [Node.js](https://nodejs.org/) 20+

```bash
git clone https://github.com/sovereign-shovels/claude-prompts.git
cd claude-prompts
npm install
npm run build
```

---

## Usage

### Initialize

```bash
claude-prompts init
# Creates ~/.config/claude-prompts/ with sample config and prompt
```

### Add a prompt

```bash
claude-prompts add coding-style \
  --title "Coding Style" \
  --content "Always use explicit types. Prefer const over let." \
  --tags "coding,style" \
  --destination ".cursorrules"
```

### List prompts

```bash
claude-prompts list
claude-prompts list --tags "coding"
```

### Show a prompt

```bash
claude-prompts show coding-style
```

### Sync to destinations

```bash
claude-prompts sync
# Generates .cursorrules and AGENTS.md in current directory

claude-prompts sync --target .cursorrules --cwd ~/my-project
```

### Prompt format

Prompts are markdown files with YAML frontmatter, stored in `~/.config/claude-prompts/library/`:

```markdown
---
title: Coding Style
tags: [coding, style]
destination: .cursorrules
---

Always use explicit types. Prefer const over let. Use async/await over callbacks.
```

---

## Why this exists

Cross-tool fragmentation is a real, growing pain. No major tool wants to solve it because each wants lock-in.

See [PRD-v1.md](./PRD-v1.md) for the full problem statement and rationale.

## What's next

- **v0.5:** Adapters for Cline rules, Continue config, Aider conventions. Bidirectional sync.
- **v1.0:** Versioning + diff. Sharing canonical libraries across teams. Prompt evaluation hooks.

See [PRD-v1.md](./PRD-v1.md) for the full roadmap.

---

## License

Apache 2.0. See [LICENSE](./LICENSE).

## Part of sovereign-shovels

This repo is part of the [sovereign-shovels](https://github.com/sovereign-shovels) portfolio of small, focused, sovereign-by-construction AI utilities.

Other shovels: claude-vault, bulbul-studio, saaras-tray, claude-prompts, ollama-cron, mcp-forge, sarvam-pdf, agent-console, sarvam-meet, obsidian-llm, llm-diff, claude-bridge, claude-radio, sarvam-cast.
