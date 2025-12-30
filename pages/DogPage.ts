import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DogPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;
    readonly pageHeader: Locator;

    constructor(page: Page) {
        super(page);
        
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.messageInput = page.getByPlaceholder('Message');
        this.sendButton = page.getByRole('button', { name: 'Send' });
        this.pageHeader = page.locator('#main h1');
    }

    async fillContactDetails(userName: string, userEmail: string, dogName: string) {
        await expect(this.pageHeader).toHaveText(dogName);
        await this.nameInput.fill(userName);
        await this.emailInput.fill(userEmail);
        const uniqueMessage = `Hello! I really want to adopt ${dogName}. He is so cute!`;
        await this.messageInput.fill(uniqueMessage);
    }

    async submitForm() {
        await this.sendButton.click();
    }
}