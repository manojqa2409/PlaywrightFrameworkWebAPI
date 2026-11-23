import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class LoginPage extends BasePage {


    //1. private locators (maintain the locators)

    private readonly emailid: Locator
    private readonly password: Locator
    private readonly loginBtn: Locator
    private readonly forgottenPasswordLink: Locator
    private readonly loginwithoutcredserrormessage: Locator;

    //2. constructor of the page class: initilize the locators which used above

    constructor(page: Page) {

        super(page)

        this.emailid = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByLabel('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' })
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first()
        this.loginwithoutcredserrormessage = page.locator('#account-login > div.alert.alert-danger:nth-of-type(1)')
    }

    // 3. public page actions (methods)/ behaviour : Encapsulation oops concept here

    async goToLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isForgottenPwdLinkExist(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible()
    }

    async doLogin(username: string, password: string) {
        console.log(`user credes: ${username} - #${password}`);
        await this.emailid.fill(username);
        await this.password.fill(password)
        await this.loginBtn.click()
    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginwithoutcredserrormessage.isVisible();

    }



}

