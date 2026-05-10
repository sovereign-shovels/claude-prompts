---
repo: claude-prompts
rank: 4
score: 0.76
sprint: 3
substrate_anchor: Claude
build_estimate: "3–4 weeks for v0.1"
status: planned
---

# PRD v1.0 — claude-prompts

> **One-liner:** One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.
>
> **Substrate:** Anyone authoring prompts across Claude Projects, Cursor rules, Cline rules, AGENTS.md, Continue config, etc.
> **Launch channels:** r/ClaudeAI, r/cursor, r/ClineProject, AI Twitter, dev.to, HN
> **Build estimate (v0.1):** 3–4 weeks for v0.1

---

## What problem does this solve

Power users now maintain prompts across Claude Projects, Cursor rules (.cursorrules / .cursor/rules/), Cline rules, AGENTS.md, Continue config, Aider conventions, ChatGPT custom instructions, and more. Each tool wants its own format. Updates drift. The same prompt exists in five places, slightly different. claude-prompts treats one local markdown library as canonical and syncs into the others.

## Why this is a shovel and not a product

Cross-tool fragmentation is a real, growing pain. No major tool wants to solve it because each wants lock-in. Buildable. Sovereign by construction. Scope-evolves into versioning, team sharing, evaluation.

---

## v0.1 — what ships

CLI + small UI maintains a local prompt library (markdown files with YAML frontmatter). Sync adapters for 3 destinations at launch: Claude Projects (via API), Cursor rules (.cursorrules + .cursor/rules/), AGENTS.md.

### Acceptance criteria for v0.1

A v0.1 release is publishable to GitHub when ALL of these are true:

- [ ] Core functionality described above works on the primary developer machine.
- [ ] At least one local-only configuration is documented and tested (no cloud required).
- [ ] BYO endpoint / BYO key configuration is documented.
- [ ] README explains: what it is, who it's for, how to install, how to configure, what it doesn't do.
- [ ] LICENSE present (Apache 2.0 unless overridden).
- [ ] No hardcoded keys or vendor URLs anywhere.
- [ ] No telemetry / phone-home.
- [ ] At least one passing test for the main code path.
- [ ] CI green.
- [ ] AGENTS.md compliance reviewed.

## v0.5 — first major evolution

Adapters for Cline rules, Continue config, Aider conventions. Bidirectional sync (changes anywhere flow back to canonical).

## v1.0 — fuller scope

Versioning + diff. Sharing canonical libraries across teams. Prompt evaluation hooks.

---

## Architecture sketch

### Stack

Plain markdown + YAML frontmatter is the canonical format. CLI in TS or Rust. Adapter interface is a simple contract. UI is optional (web or Tauri).

### Provider abstraction

The shovel MUST expose a provider abstraction even if v0.1 only uses one
provider. Suggested shape:

```
interface Provider {
  name: string;
  endpoint: URL;
  apiKeyEnvVar: string;
  call(input: ProviderInput): Promise<ProviderOutput>;
}
```

The default config in v0.1 must point to a free, local provider where
applicable, and document how to swap in any other.

### Configuration

Configuration order of precedence (highest to lowest):

1. Command-line flags
2. Environment variables (prefix: `CLAUDE_PROMPTS_*`)
3. User config file (`~/.config/claude-prompts/config.toml` on Linux/Mac, equivalent on Windows)
4. Default config (shipped, but never with secrets)

---

## Anti-scope (do NOT build)

Not a prompt evaluator. Not a prompt marketplace. Not a team collaboration tool in v0.1.

---

## Tombstone risk and mitigation

**Risk:** Any one of the destination tools shipping native cross-platform sync. Low — each tool wants its own lock-in.

**Mitigation:** Ship fast (v0.1 in 3–4 weeks for v0.1). Build community early
(launch on r/ClaudeAI, r/cursor, r/ClineProject, AI Twitter, dev.to, HN). Even if upstream absorbs the feature, accumulated
stars and the community are the audience-build payoff.

**Kill signal:** Adapter maintenance burden becoming overwhelming as destination tools change formats.

If the kill signal triggers, the maintainer must announce within one week and
either (a) refocus on a remaining gap, (b) merge gracefully into upstream if
they're receptive, or (c) mark the repo as archived with a clear pointer to the
replacement.

---

## Launch plan

### Pre-launch checklist

- [ ] Repo on GitHub at `github.com/sovereign-shovels/claude-prompts`
- [ ] README polished (see template in `_templates/`)
- [ ] At least 3 issues / discussions seeded (real ones, not placeholder)
- [ ] LICENSE, CODE_OF_CONDUCT, CONTRIBUTING present
- [ ] Demo asset (gif, screenshot, or short video — depending on category)
- [ ] First-launch post drafted for primary launch channel

### Day-1 launch

Post to: r/ClaudeAI, r/cursor, r/ClineProject, AI Twitter, dev.to, HN

Subject template (adjust per channel):
- Show HN: `Show HN: claude-prompts – One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.`
- Reddit: `[OSS] One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.` with full post explaining the gap and the build
- Twitter/X: thread leading with the demo gif

### Week-1 follow-up

- Respond to every issue and comment within 24h.
- Ship at least one bugfix release based on launch feedback.
- Cross-post to secondary channels.

### Month-1 review

- Assess star velocity and community formation.
- If kill signal triggered, follow tombstone protocol above.
- If trajectory is healthy, plan v0.5.

---

## Cross-references

- Constitution: [[AGENTS]]
- Public README: [[README]]
- Progress frontmatter: [[progress]]
- Internal knowledge graph: [[knowledge-graph]]
