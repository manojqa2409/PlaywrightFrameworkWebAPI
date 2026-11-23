import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

let loginpage: LoginPage

test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
})

test('Login Page Title Test', async () => {
    let loginPageTitle = await loginpage.getLoginPageTitle();
    console.log('Login Page Title Test:', loginPageTitle)
    expect(loginPageTitle).toBe('Account Login')

})

test('Forgot password link exist test', async () => {
    expect(await loginpage.isForgottenPwdLinkExist()).toBeTruthy();

})

test('User is able to login', async () => {
    await loginpage.doLogin('mia.garcia808@test.com', 'Admin@123');

})