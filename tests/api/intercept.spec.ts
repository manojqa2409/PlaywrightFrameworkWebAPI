import { test, expect } from '@playwright/test';

//  Web App --> interept the network calls and log them
// **/*  --> wildcrds pattern for URLs


test('@smoke intercept the url and log the request', async ({ page }) => {

    // below are the listners

    await page.route('**/*', async (route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue(); //url1--capture, url2--capture, url3--capture,...etc
    });

    // Navigate to web app

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')

})


// intercept with mocking:
// mocking:facke data/ response:

test('@smoke mock search data api', async ({ page }) => {

    let fakedata = [
        { name: 'Fake Macbook Pro', price: '$679' },
        { name: 'Fake IPhone 18', price: '$9999' },

    ]

    // below are the listners

    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        //console.log(route.request().method(), route.request().url());
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakedata)
        })
    });

    // Navigate to web app

    await page.goto('https://manoj.com/index.php?route=product/search&search=macbook')
    // await page.pause()

})

test('@smoke mock HTML data', async ({ page }) => {

    let fakedata = [
        { name: 'Fake Macbook Pro', price: '$679' },
        { name: 'Fake IPhone 18', price: '$9999' },

    ]

    // below are the listners

    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        //console.log(route.request().method(), route.request().url());
        await route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Product List</title>
                    </head>
                    <body>

                        <h2>Product List</h2>

                        <p>Fake Macbook Pro - $679</p>
                        <p>Fake IPhone 18 - $9999</p>

                    </body>
                    </html>
                            `
        })
    });

    // Navigate to web app

    await page.goto('https://manoj.com/index.php?route=product/search&search=macbook')
    // await page.pause()

})
