import { Locator, Page, test, expect } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async navigateTo(path: string) {
        await test.step(`Maps to ${path}`, async () => {
            await this.page.goto(path);
        });
    }

    protected async clickElement(locator: Locator) {
        await test.step(`Click element: ${locator}`, async () => {
            await locator.click();
        });
    }

    protected async fillElement(locator: Locator, value: string) {
        await test.step(`Fill field ${locator} with value: ${value}`, async () => {
            await locator.fill(value);
        });
    }

    protected async validateText(locator: Locator, text: string) {
        await expect(locator).toHaveText(text);
    }
}