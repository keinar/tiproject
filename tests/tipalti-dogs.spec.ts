import { test, expect } from '../fixtures/baseFixture';

const TEST_DATA = {
    url: 'https://qa-tipalti-assignment.tipalti-pg.com/index.html',
    expectedMenuItems: ['Home', 'Kika', 'Lychee', 'Kimba'],
    dogToAdopt: 'Kika',
    user: {
        name: 'Keinar Elkayam',
        email: 'test@test.test'
    }
};

test.describe('Tipalti Dogs Adoption Workflow', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_DATA.url);
    });

    test('Verify all menu items are displayed correctly', async ({menu}) => {
        
        await menu.openMenu();
        const items = await menu.getMenuItemsList();
        console.log('Menu items found:', items);
        expect(items).toEqual(TEST_DATA.expectedMenuItems);
        expect(items).toContain(TEST_DATA.dogToAdopt);
    });

    test(`Select "${TEST_DATA.dogToAdopt}" and submit contact details`, async ({ menu, dogPage, page }) => {
        
        await menu.openMenu();
        await menu.selectMenuItem(TEST_DATA.dogToAdopt);

        await expect(page).toHaveURL(new RegExp(TEST_DATA.dogToAdopt.toLowerCase()));

        await dogPage.fillContactDetails(
            TEST_DATA.user.name, 
            TEST_DATA.user.email, 
            TEST_DATA.dogToAdopt
        );

        await dogPage.submitForm();

        await expect(page.locator('body')).toContainText('MethodNotAllowed')
    });
});