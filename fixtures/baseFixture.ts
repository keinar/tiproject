import { test as base } from '@playwright/test';
import { Menu } from '../pages/components/Menu';
import { DogPage } from '../pages/DogPage';

type MyFixtures = {
    menu: Menu
    dogPage: DogPage
};

export const test = base.extend<MyFixtures>({

    menu: async({page}, use) => {
        await use(new Menu(page))
    },
    dogPage: async({page}, use) => {
        await use(new DogPage(page))
    } 
});

export { expect } from '@playwright/test';