import { Locator, Page } from "playwright-core";
import { BasePage } from "../BasePage";
import { expect } from "playwright/test";

export class Menu extends BasePage{
    readonly menuButton: Locator
    readonly menuContainer: Locator
    readonly menuListItems: Locator;

    constructor(page: Page){
        super(page);
        this.menuButton = page.getByRole('link', { name: 'Menu' });
        this.menuContainer = page.locator('#menu')
        this.menuListItems = page.locator('#menu ul li a')
    }

    async openMenu(){
        await this.clickElement(this.menuButton);
        await expect(this.menuContainer).toBeVisible();
    }

    async selectMenuItem(item: string){
        const menuItem = this.menuContainer.getByRole('link', { name: item });
        await this.clickElement(menuItem)
    }

    async getMenuItemsList(): Promise<string[]>{
        await this.menuListItems.allTextContents();
        return await this.menuListItems.allTextContents();
    }
}