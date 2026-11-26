
import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});


test('home page title test', async ({ homePage }) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('home page title: ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('@regression home page headers exist test', async ({ homePage, page }) => {
    // wait until login has landed on the My Account page before reading headers
    await page.waitForURL(/route=account\/account/, { timeout: 10000 });
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('home page headers: ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});


//common features test:
test('@smoke App logo exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke Search Box exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('@smoke Cart exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('@smoke Footers exists on Login Page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});
