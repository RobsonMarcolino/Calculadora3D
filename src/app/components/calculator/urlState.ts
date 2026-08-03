import type { Service } from "./pricing";

/**
 * Serializes the calculator state into URL search params so the user can
 * share a link with their pricing configuration pre-loaded.
 *
 * Format: ?svc=id,lp&exp=1&cli=2&opp=0
 */

type Pos = 0 | 1 | 2;

export interface ShareableState {
  services: Service[];
  expPos: Pos;
  clientPos: Pos;
  oppPos: Pos;
}

const VALID_SERVICES: Service[] = ["id", "lp", "pitchdeck"];
const VALID_POS = [0, 1, 2] as const;

/** Write current state into the URL (replaceState — no history entry). */
export function writeStateToURL(state: ShareableState): void {
  const params = new URLSearchParams(window.location.search);

  if (state.services.length > 0) {
    params.set("svc", state.services.join(","));
  } else {
    params.delete("svc");
  }

  params.set("exp", String(state.expPos));
  params.set("cli", String(state.clientPos));
  params.set("opp", String(state.oppPos));

  const qs = params.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState(null, "", url);
}

/** Read state from URL search params. Returns null if no state is encoded. */
export function readStateFromURL(): ShareableState | null {
  const params = new URLSearchParams(window.location.search);

  const hasSvc = params.has("svc");
  const hasExp = params.has("exp");
  const hasCli = params.has("cli");
  const hasOpp = params.has("opp");

  // Only hydrate if at least one pricing param is present
  if (!hasSvc && !hasExp && !hasCli && !hasOpp) return null;

  const services = hasSvc
    ? (params.get("svc")!.split(",").filter((s) => VALID_SERVICES.includes(s as Service)) as Service[])
    : [];

  const parsePos = (key: string, fallback: Pos): Pos => {
    const v = Number(params.get(key));
    return VALID_POS.includes(v as Pos) ? (v as Pos) : fallback;
  };

  return {
    services,
    expPos: parsePos("exp", 1),
    clientPos: parsePos("cli", 1),
    oppPos: parsePos("opp", 1),
  };
}

/** Generate a shareable URL string with the current state. */
export function generateShareURL(state: ShareableState): string {
  const params = new URLSearchParams();
  if (state.services.length > 0) params.set("svc", state.services.join(","));
  params.set("exp", String(state.expPos));
  params.set("cli", String(state.clientPos));
  params.set("opp", String(state.oppPos));
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}
