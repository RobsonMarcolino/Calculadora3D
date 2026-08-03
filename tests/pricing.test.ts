import { describe, it, expect } from "vitest";
import {
  calculatePrice,
  formatNumber,
  SERVICE_PRICES,
  EXPERIENCE_MULT,
  OPPORTUNITY_MULT,
  MONTHLY_HOURS,
  CUSTO_START,
  type PricingInput,
  type Service,
  type ClientSize,
  type Experience,
  type Opportunity,
} from "../src/app/components/calculator/pricing";

// ---------------------------------------------------------------------------
// calculatePrice
// ---------------------------------------------------------------------------

describe("calculatePrice", () => {
  const input = (overrides: Partial<PricingInput> = {}): PricingInput => ({
    services: ["id"],
    client: "medio",
    experience: "pleno",
    opportunity: "media",
    custo: CUSTO_START,
    ...overrides,
  });

  it("returns zero base and projectPrice when no services selected", () => {
    const r = calculatePrice(input({ services: [] }));
    expect(r.base).toBe(0);
    expect(r.projectPrice).toBe(0);
  });

  it("computes base as the sum of selected services for the given client size", () => {
    const services: Service[] = ["id", "lp"];
    const client: ClientSize = "medio";
    const expected = SERVICE_PRICES.id[client] + SERVICE_PRICES.lp[client];
    const r = calculatePrice(input({ services, client }));
    expect(r.base).toBe(expected);
  });

  it("applies experience multiplier correctly", () => {
    const r = calculatePrice(input({ experience: "senior", opportunity: "pouca" }));
    // With opportunity = pouca (×1.0), the multiplier is purely experience
    expect(r.projectPrice).toBeCloseTo(
      SERVICE_PRICES.id.medio * EXPERIENCE_MULT.senior * OPPORTUNITY_MULT.pouca,
    );
  });

  it("applies opportunity multiplier correctly", () => {
    const r = calculatePrice(input({ experience: "pleno", opportunity: "alta" }));
    expect(r.projectPrice).toBeCloseTo(
      SERVICE_PRICES.id.medio * EXPERIENCE_MULT.pleno * OPPORTUNITY_MULT.alta,
    );
  });

  it("stacks all three services", () => {
    const services: Service[] = ["id", "lp", "pitchdeck"];
    const client: ClientSize = "grande";
    const r = calculatePrice(
      input({ services, client, experience: "pleno", opportunity: "pouca" }),
    );
    const expectedBase =
      SERVICE_PRICES.id[client] + SERVICE_PRICES.lp[client] + SERVICE_PRICES.pitchdeck[client];
    expect(r.base).toBe(expectedBase);
    expect(r.projectPrice).toBe(expectedBase); // pleno×1 · pouca×1
  });

  it("computes hourlyMin from custo / MONTHLY_HOURS", () => {
    const custo = 6000;
    const r = calculatePrice(input({ custo }));
    expect(r.hourlyMin).toBeCloseTo(custo / MONTHLY_HOURS);
  });

  it("computes hoursEquiv = projectPrice / hourlyMin", () => {
    const custo = 6000;
    const r = calculatePrice(
      input({ custo, experience: "pleno", opportunity: "pouca" }),
    );
    const expectedHourly = custo / MONTHLY_HOURS;
    expect(r.hoursEquiv).toBeCloseTo(r.projectPrice / expectedHourly);
  });

  it("returns hoursEquiv = 0 when custo is 0", () => {
    const r = calculatePrice(input({ custo: 0 }));
    expect(r.hoursEquiv).toBe(0);
  });

  // Exhaustive: every combination of client × experience × opportunity
  const clients: ClientSize[] = ["pequeno", "medio", "grande"];
  const experiences: Experience[] = ["junior", "pleno", "senior"];
  const opportunities: Opportunity[] = ["pouca", "media", "alta"];

  clients.forEach((client) => {
    experiences.forEach((experience) => {
      opportunities.forEach((opportunity) => {
        it(`${client}/${experience}/${opportunity}: base × ${EXPERIENCE_MULT[experience]} × ${OPPORTUNITY_MULT[opportunity]}`, () => {
          const services: Service[] = ["id"];
          const r = calculatePrice(input({ services, client, experience, opportunity }));
          const expected =
            SERVICE_PRICES.id[client] *
            EXPERIENCE_MULT[experience] *
            OPPORTUNITY_MULT[opportunity];
          expect(r.projectPrice).toBeCloseTo(expected, 2);
        });
      });
    });
  });
});

// ---------------------------------------------------------------------------
// formatNumber
// ---------------------------------------------------------------------------

describe("formatNumber", () => {
  it("rounds and formats with pt-BR locale (no decimals)", () => {
    // 1234.6 → rounds to 1235 → "1.235" in pt-BR
    const result = formatNumber(1234.6);
    expect(result).toBe("1.235");
  });

  it("formats zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("formats large numbers with thousands separators", () => {
    const result = formatNumber(18000);
    expect(result).toBe("18.000");
  });

  it("rounds down .4", () => {
    expect(formatNumber(999.4)).toBe("999");
  });
});
