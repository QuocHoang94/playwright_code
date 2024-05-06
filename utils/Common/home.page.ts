import type { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async Gotohomepage() {
    await this.page.goto("");
  }
}