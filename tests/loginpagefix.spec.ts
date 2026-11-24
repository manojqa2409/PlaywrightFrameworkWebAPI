import {test, expect} from '../src/fixtures/pagefixtures';

import * as allure from "allure-js-commons";


import {meta, log} from 'reporting-labs';
import { BasePage } from '../src/pages/BasePage';

test.beforeEach(async ({ loginPage, page }) => {
   
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
})

test('Login Page Title Test', async ({loginPage}) => {
    meta({
        priority: 'P2',
        severity: 'critical',
        owner: 'Manoj',
        story: 'US101',
        epic: 'EP101'
    })
    let loginPageTitle = await loginPage.getLoginPageTitle();
    console.log('Login Page Title:', loginPageTitle)
    await log('Login Page Title:', loginPageTitle)
    expect(loginPageTitle).toBe('Account Login')

})

test('Forgot password link exist test', async ({loginPage}) => {
    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();

})

test('User is able to login', async ({loginPage}) => {
    await loginPage.doLogin('mia.garcia808@test.com', 'Admin@123');


})

// common features test:

test ('App logo exist on Login page', async ({basePage}) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();

})

test ('Search Box exist on Login page', async ({basePage}) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();

})

test ('Cart button exist on Login page', async ({basePage}) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();

})

test ('Footer on Login page', async ({basePage}) => {
    expect(await basePage.getPageFooterscount()).toBe(16);

})