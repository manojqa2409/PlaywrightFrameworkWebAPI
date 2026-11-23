import { Locator, Page } from "@playwright/test";
import { threadId } from "worker_threads";


export class BasePage {

    protected readonly page: Page;

    // common locatiors across all pages

    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly serchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;



    constructor(page: Page) {
        this.page = page;

        this.logo = page.getByRole('img', { name: 'naveenopencart' });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.serchIcon = page.locator('div#search button');
        this.currency = page.locator('#form-currency');
        this.cartButton = page.locator('div#cart button');
        this.footerLinks = page.locator('footer a');

    }

    // App common features/actions: footer, logo, search

    // Logo Visible

    async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    }

    // Search Box Visible
    async isSearchBoxVisible(): Promise<boolean> {
        return await this.searchBox.isVisible();
    }

    // Currency Box Visible
    async isCurrencyVisible(): Promise<boolean> {
        return await this.currency.isVisible();
    }

    // Cart Button Visible
    async isCartButtonVisible(): Promise<boolean> {
        return await this.cartButton.isVisible();
    }

    // Get page footer counts

    async getPageFooterscount(): Promise<number> {
        return await this.footerLinks.count();
    }


    // Get Page footer links

    async getPageFooter(): Promise<string[]> {
        return await this.footerLinks.allInnerTexts();
    }

    //  Page Level generic methods:

    // Page Title

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    // Page URL

    getPageCurrentURL(): string {
        return this.page.url();
    }

    // Wait for page load

    async waitForPageLoad() {
        await this.page.waitForLoadState();
    }

// Take screeshot

async takescreenshot(name: string) {
    return await this.page.screenshot({
        fullPage: true,
        path: `reports/screenshot/${name}.png`
    })
}


}