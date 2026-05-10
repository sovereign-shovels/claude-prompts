# claude-prompts

> One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.

**Status:** v0.1 — planning. Not yet released.

**Sovereignty:** sovereign-by-construction. BYO endpoint, BYO key, BYO model.
A local-only configuration is documented and tested.

This is a community project, **not affiliated with Claude**.
Best-effort community shovel — no SLA, no roadmap commitments.

---

## What this is

One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.

## What this isn't

Not a prompt evaluator. Not a marketplace. Not a team collaboration tool in v0.1.

## Install

> Coming with v0.1 release.

## Configure

You bring the model. By default `claude-prompts` tries to use a local provider:

- For LLM endpoints: Ollama at `http://localhost:11434`
- For voice endpoints: configurable, see [docs/configure.md]

To use any other provider (Claude, GPT, Hermes, OpenRouter, Sarvam, etc.):

```toml
# ~/.config/claude-prompts/config.toml
[provider]
endpoint = "https://api.your-provider.com/v1"
api_key_env = "YOUR_PROVIDER_KEY"
model = "your-model-name"
```

Anthropic, OpenAI, and Sarvam endpoints all work. Local Ollama, llama.cpp,
LM Studio, and vLLM all work via their OpenAI-compatible endpoints.

## Why this exists

Power users now maintain prompts across Claude Projects, Cursor rules (.cursorrules / .cursor/rules/), Cline rules, AGENTS.md, Continue config, Aider conventions, ChatGPT custom instructions, and more. Each tool wants its own format. Updates drift. The same prompt exists in five places, slightly different. claude-prompts treats one local markdown library as canonical and syncs into the others.

## What's next

See [PRD-v1.md](./PRD-v1.md) for the full v0.1 → v0.5 → v1.0 plan.

## License

Apache 2.0. See [LICENSE](./LICENSE).

## Part of sovereign-shovels

This repo is part of the [sovereign-shovels](https://github.com/sovereign-shovels)
portfolio of small, focused, sovereign-by-construction AI utilities.

Other shovels: claude-vault, bulbul-studio, saaras-tray, claude-prompts,
ollama-cron, mcp-forge, sarvam-pdf, agent-console, sarvam-meet, obsidian-llm,
llm-diff, claude-bridge, claude-radio, sarvam-cast.
