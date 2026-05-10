import { homedir } from "os";
import { join } from "path";
import { existsSync, readFileSync, mkdirSync } from "fs";

export interface Config {
  libraryPath: string;
  syncTargets: string[];
}

export function getConfigDir(): string {
  const base = process.env.XDG_CONFIG_HOME || join(homedir(), ".config");
  return join(base, "claude-prompts");
}

export function getLibraryPath(): string {
  return join(getConfigDir(), "library");
}

export function loadConfig(): Config {
  const configPath = join(getConfigDir(), "config.json");
  if (existsSync(configPath)) {
    const raw = readFileSync(configPath, "utf-8");
    return JSON.parse(raw) as Config;
  }
  return {
    libraryPath: getLibraryPath(),
    syncTargets: [".cursorrules", "AGENTS.md"],
  };
}

export function ensureDirs() {
  const dir = getConfigDir();
  const lib = getLibraryPath();
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(lib)) mkdirSync(lib, { recursive: true });
}
