import { test, expect } from '../../src/fixtures/apifixtures';



const TOKEN = process.env.API_TOKEN! ;

let AUTH_HEADER = {

    Authorization: `Bearer ${TOKEN}`
};

let userId: number;

// Run the test in Sequential mode b

test.describe.serial('running e2e go rest CRUD apis test', () => {
    //GET Test:

    test('GET API- get all the user', async ({ apiHelper }) => {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })

    //POST Test:

    test('POST API- create the user', async ({ apiHelper }) => {
        let userData = {
            name: 'manoj',
            email: `manoj${Date.now()}@gmail.com`, //unique email, GoRest rejects duplicates with 422
            gender: 'male',
            status: 'active'
        }

        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);

        expect((response).status).toBe(201); //create user
        userId = response.body.id;
        console.log('created userid-POST:', userId);
        //expect(response.body.length).toBeGreaterThan(0);
    })

    // PUT Test:

    test('PUT API- create the user', async ({ apiHelper }) => {
        let userData = {
            name: 'manoj kumar',
            email: `manoj${Date.now()}@gmail.com`, //unique email, GoRest rejects duplicates with 422
            gender: 'male',
            status: 'Inactive'
        }

        let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER);

        expect((response).status).toBe(200); //updated user data
        userId = response.body.id;
        console.log('updated userid-PUT:', userId);
        expect(response.body.name).toBe(userData.name);
    })

    //DELETE Test:

    test('Delete API- create the user', async ({ apiHelper }) => {

        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);

        expect((response).status).toBe(204); //deleted user data
        console.log('deleted userid-Delete:', userId);

    })



})