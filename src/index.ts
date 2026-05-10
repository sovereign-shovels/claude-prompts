#!/usr/bin/env node
import { Command } from "commander";
import { homedir } from "os";
import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { loadConfig, ensureDirs, getLibraryPath } from "./config.js";
import { listPrompts, addPrompt, getPrompt } from "./library.js";
import { syncAll } from "./sync.js";

const program = new Command();

program.name("claude-prompts").description("One canonical prompt library.").version("0.1.0");

program
  .command("init")
  .description("Create sample config and library structure")
  .action(() => {
    ensureDirs();
    const configPath = join(getLibraryPath(), "..", "config.json");
    if (!existsSync(configPath)) {
      writeFileSync(
        configPath,
        JSON.stringify(
          {
            libraryPath: getLibraryPath(),
            syncTargets: [".cursorrules", "AGENTS.md"],
          },
          null,
          2
        )
      );
    }

    // Add a sample prompt
    addPrompt(
      getLibraryPath(),
      "coding-style",
      "Coding Style",
      "Always use explicit types. Prefer const over let. Use async/await over callbacks.",
      ["coding", "style"]
    );

    console.log("Initialized claude-prompts.");
    console.log(`Library: ${getLibraryPath()}`);
    console.log(`Config:  ${configPath}`);
  });

program
  .command("add <id>")
  .description("Add a new prompt")
  .requiredOption("-t, --title <title>", "Prompt title")
  .requiredOption("-c, --content <content>", "Prompt content")
  .option("--tags <tags>", "Comma-separated tags")
  .option("--destination <dest>", "Sync destination (.cursorrules, AGENTS.md)")
  .action((id, opts) => {
    ensureDirs();
    const tags = opts.tags ? opts.tags.split(",").map((t: string) => t.trim()) : [];
    addPrompt(getLibraryPath(), id, opts.title, opts.content, tags, opts.destination);
    console.log(`Added prompt '${id}'.`);
  });

program
  .command("list")
  .description("List all prompts")
  .option("--tags <tags>", "Filter by tags (comma-separated)")
  .action((opts) => {
    const tags = opts.tags ? opts.tags.split(",").map((t: string) => t.trim()) : [];
    const prompts = listPrompts(getLibraryPath());
    const filtered =
      tags.length > 0 ? prompts.filter((p) => tags.some((t: string) => p.tags.includes(t))) : prompts;

    if (filtered.length === 0) {
      console.log("No prompts found.");
      return;
    }

    for (const p of filtered) {
      const tagStr = p.tags.length > 0 ? ` [${p.tags.join(", ")}]` : "";
      const destStr = p.destination ? ` → ${p.destination}` : "";
      console.log(`${p.id}${tagStr}${destStr}\n  ${p.content.slice(0, 100)}${p.content.length > 100 ? "..." : ""}`);
    }
  });

program
  .command("show <id>")
  .description("Show a single prompt")
  .action((id) => {
    const p = getPrompt(getLibraryPath(), id);
    if (!p) {
      console.error(`Prompt '${id}' not found.`);
      process.exit(1);
    }
    console.log(`# ${p.title}\n`);
    console.log(p.content);
    if (p.tags.length > 0) console.log(`\nTags: ${p.tags.join(", ")}`);
    if (p.destination) console.log(`Destination: ${p.destination}`);
  });

program
  .command("sync")
  .description("Sync prompts to configured destinations")
  .option("--target <target>", "Specific target to sync")
  .option("--cwd <cwd>", "Working directory for output files", process.cwd())
  .action((opts) => {
    const cfg = loadConfig();
    const prompts = listPrompts(cfg.libraryPath);
    const targets = opts.target ? [opts.target] : cfg.syncTargets;
    syncAll(prompts, targets, opts.cwd);
  });

program.parse();
