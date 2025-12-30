import { test, expect } from '../fixtures/baseFixture';
import { DOGS_DATA } from '../data/dogsData';


test.describe('Tipalti Dogs Adoption Workflow', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(DOGS_DATA.url);
    });

    test('Verify all menu items are displayed correctly', async ({menu}) => {
        
        await menu.openMenu();
        const items = await menu.getMenuItemsList();
        console.log('Menu items found:', items);
        expect(items).toEqual(DOGS_DATA.expectedMenuItems);
        expect(items).toEqual(expect.arrayContaining(DOGS_DATA.dogsToAdopt));
    });
    for (const dogName of DOGS_DATA.dogsToAdopt) {
        test(`Select "${dogName}" and submit contact details`, async ({ menu, dogPage, page }) => {
            
            await menu.openMenu();

            const items = await menu.getMenuItemsList();
            expect(items).toContain(dogName);

            await menu.selectMenuItem(dogName);

            await expect(page).toHaveURL(new RegExp(dogName.toLowerCase()));

            await dogPage.fillContactDetails(
                DOGS_DATA.user.name, 
                DOGS_DATA.user.email, 
                dogName
            );

            await dogPage.submitForm();

            await expect(page.locator('body')).toContainText('MethodNotAllowed')
        });
    }
});