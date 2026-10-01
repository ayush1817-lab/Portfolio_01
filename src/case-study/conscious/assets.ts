import { assets, type Asset, type AssetKey } from "./content";

/*
 * Asset resolution: any file in src/assets/conscious/ whose name matches a
 * manifest entry fills that slot. Matching is on the file stem, so any
 * supported extension works.
 */
const files = import.meta.glob("../../assets/conscious/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const stem = (name: string) => name.replace(/\.[^.]+$/, "");
const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) byName[stem(path.split("/").pop()!)] = url;

export function assetSrc(a: Asset): string | undefined {
  return byName[stem(a.file)];
}

/** True once the slot's image has been added. Empty slots stay off the live page. */
export function hasAsset(key: AssetKey): boolean {
  return Boolean(assetSrc(assets[key] as Asset));
}
