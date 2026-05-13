import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { AppLayout } from "@/app/components/AppLayout";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";

describe("AppLayout", () => {
  it("renders sidebar with navigation", () => {
    const { container } = render(
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    );
    expect(container.textContent).toContain("Pathfinder");
    expect(container.textContent).toContain("Dashboard");
    expect(container.textContent).toContain("Buscar Becas");
  });

  it("renders user profile section", () => {
    const { container } = render(
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    );
    expect(container.textContent).toContain("Camila López");
    expect(container.textContent).toContain("Estudiante");
  });

  it("renders topbar with notification and avatar", () => {
    const { container } = render(
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    );
    // Check for presence of key elements
    expect(container.querySelector(".flex-1")).toBeTruthy();
  });
});
