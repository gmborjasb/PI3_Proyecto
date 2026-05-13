import { describe, it, expect } from "vitest";
import { MatchScore } from "@/app/components/MatchScore";
import { render } from "@testing-library/react";

describe("MatchScore", () => {
  it("renders score correctly", () => {
    const { container } = render(<MatchScore score={85} size="md" />);
    expect(container).toBeTruthy();
    // Score should be visible in text
    expect(container.textContent).toContain("85");
  });

  it("renders with small size", () => {
    const { container } = render(<MatchScore score={70} size="sm" />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain("70");
  });

  it("handles 100 score", () => {
    const { container } = render(<MatchScore score={100} size="lg" />);
    expect(container.textContent).toContain("100");
  });
});
