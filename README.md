# claude-prompts

> One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.

**Status:** v0.1 — in development.

**Sovereignty:** sovereign-by-construction. BYO endpoint, BYO key, BYO model.
A local-only configuration is documented and tested.

This is a community project, **not affiliated with Claude**.
Best-effort community shovel — no SLA, no roadmap commitments.

---

## What this is

One canonical prompt library. Author once, sync into Claude Projects, Cursor, Cline, AGENTS.md.

## What this isn't

See [PRD-v1.md](./PRD-v1.md) for the full anti-scope definition.

## Install

### From package manager (when v0.1 ships)

```bash
npm install -g claude-prompts
```

### Build from source

```bash
git clone https://github.com/sovereign-shovels/claude-prompts.git
cd claude-prompts
```
# Install dependencies
npm install

# Build
npm run build

# Or link for local dev
npm link
```

## Configure

You bring the model. By default `claude-prompts` tries to use a local provider:

- For LLM endpoints: Ollama at `http://localhost:11434`
- For voice endpoints: configurable, see docs

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

See [PRD-v1.md](./PRD-v1.md) for the problem statement and rationale.

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
