import { test, expect } from '@playwright/test';

let AUTH_TOKEN = {
    Authorization: 'Bearer 01ad724299acaf02eb9829dfaa7fc0ab5530b5ce24899ca3d2cadd42c8eed444'
};

test('get all users api test', async ({ request }) => {

    let response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN

    });


    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);

})

test('create users api test-POST', async ({ request }) => {

    //user JS Object

    let userData = {
        name: 'manoj',
        email: 'manoj123@gmail.com',
        gender: 'male',
        status: 'active'
    }

    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData

    });
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status()); //201
    console.log(response.statusText()); //Created
    expect(response.status()).toBe(201); //True/False


})