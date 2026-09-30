/**
 * Screenshot resolution. Every PNG in src/assets/optiapply/ is picked up at
 * build time, so adding a missing source file (for example Huntmode.png or
 * Dashboard.png) makes its figure appear with no code change.
 */
import { shots, type ShotId } from "./content";

const files = import.meta.glob("../assets/optiapply/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  byName[path.split("/").pop()!] = url;
}

export function assetUrl(file: string): string | undefined {
  return byName[file];
}

export const isDev = import.meta.env.DEV;

/** True when the source screenshot for a shot has been supplied. */
export function hasShot(id: ShotId): boolean {
  return Boolean(assetUrl(shots[id].file));
}
