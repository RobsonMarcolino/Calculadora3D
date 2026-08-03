import { describe, it, expect } from "vitest";
import {
  readStateFromURL,
  generateShareURL,
  type ShareableState,
} from "../src/app/components/calculator/urlState";

// We test the pure parsing logic by directly injecting search strings.
// Since the module reads `window.location.search`, we mock it at the global level.

function withSearch<T>(search: string, fn: () => T): T {
  const original = globalThis.window;
  globalThis.window = {
    location: {
      search,
      pathname: "/Calculadora3D/",
      origin: "https://robsonmarcolino.github.io",
    },
    history: { replaceState: () => {} },
  } as any;
  try {
    return fn();
  } finally {
    globalThis.window = original;
  }
}

describe("readStateFromURL", () => {
  it("returns null when no pricing params are present", () => {
    const result = withSearch("", () => readStateFromURL());
    expect(result).toBeNull();
  });

  it("returns null for unrelated params", () => {
    const result = withSearch("?edit=1", () => readStateFromURL());
    expect(result).toBeNull();
  });

  it("parses services from svc param", () => {
    const state = withSearch("?svc=id,lp", () => readStateFromURL());
    expect(state).not.toBeNull();
    expect(state!.services).toEqual(["id", "lp"]);
  });

  it("filters out invalid services", () => {
    const state = withSearch("?svc=id,invalid,pitchdeck", () => readStateFromURL());
    expect(state!.services).toEqual(["id", "pitchdeck"]);
  });

  it("parses position params", () => {
    const state = withSearch("?exp=2&cli=0&opp=1", () => readStateFromURL());
    expect(state!.expPos).toBe(2);
    expect(state!.clientPos).toBe(0);
    expect(state!.oppPos).toBe(1);
  });

  it("falls back to 1 for invalid position values", () => {
    const state = withSearch("?exp=5&cli=-1&opp=abc", () => readStateFromURL());
    expect(state!.expPos).toBe(1);
    expect(state!.clientPos).toBe(1);
    expect(state!.oppPos).toBe(1);
  });

  it("handles partial params (only svc)", () => {
    const state = withSearch("?svc=pitchdeck", () => readStateFromURL());
    expect(state!.services).toEqual(["pitchdeck"]);
    // When position params are absent, Number(null) = 0 which is valid (Pos 0)
    expect(state!.expPos).toBe(0);
    expect(state!.clientPos).toBe(0);
    expect(state!.oppPos).toBe(0);
  });
});

describe("generateShareURL", () => {
  it("generates a full URL with all state params", () => {
    const state: ShareableState = {
      services: ["id", "lp"],
      expPos: 2,
      clientPos: 0,
      oppPos: 1,
    };
    const url = withSearch("", () => generateShareURL(state));
    expect(url).toContain("svc=id%2Clp");
    expect(url).toContain("exp=2");
    expect(url).toContain("cli=0");
    expect(url).toContain("opp=1");
  });

  it("omits svc when no services selected", () => {
    const state: ShareableState = {
      services: [],
      expPos: 1,
      clientPos: 1,
      oppPos: 1,
    };
    const url = withSearch("", () => generateShareURL(state));
    expect(url).not.toContain("svc=");
  });
});
