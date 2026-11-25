import { request } from 'http';
import { test, expect } from '../../src/fixtures/apifixtures';

let tokenID: string;

test.beforeEach('Generate the token', async ({ request }) => {
    let creds = {
        username: 'admin',
        password: 'password123'
    };

    let authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: { 'content-type': 'application/json' },
        data: creds
    });

    expect(authResponse.status()).toBe(200);
    let jsonResponse = await authResponse.json();
    console.log('Auth API Token: ', jsonResponse);
    tokenID = jsonResponse.token;
    console.log('token: ', tokenID);


})

// 1. create a new booking: POST -- no token needed

test('@regression Booking CRUD with token', async ({ request }) => {
    let bookingResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            "firstname": "Jim1",
            "lastname": "Brown1",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }


    });

    expect(bookingResponse.status()).toBe(200);
    let bookingJson = await bookingResponse.json();
    let bookingID = bookingJson.bookingid;

    console.log('Booking ID: ', bookingID);


    // 2. Update a booking by bookingId: nees token

    let updatedResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
        headers: { Cookie: `token=${tokenID}` },
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 121,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Lunch"

        }

    })

    expect(updatedResponse.status()).toBe(200);
    expect((await updatedResponse.json()).totalprice).toBe(121);
    expect((await updatedResponse.json()).additionalneeds).toBe('Lunch');

    // 3. Delete a booking by bookingId: needs token

    let deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
        headers: { Cookie: `token=${tokenID}` }

    })
    expect(deleteResponse.status()).toBe(201);



})






