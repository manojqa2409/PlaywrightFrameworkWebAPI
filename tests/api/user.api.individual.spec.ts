import { test, expect } from '../../src/fixtures/apifixtures';
import { ApiHelper } from './ApiHelper';

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {

    Authorization: `Bearer ${TOKEN}`
};

//helper - - generic function - create User (POST Call)

async function createUser(apiHelper: ApiHelper) {

    //User Data in JS Object

    let userData = {
        name: 'apiautomation',
        email: `apiautomation_${Date.now()}@gmail.com`,
        gender: 'male',
        status: 'active'
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;

}

//Test:1 Create User test + Verify :AAA
// POST ---> userID --> GET/userId --> Verify

test('Create a user', async ({ apiHelper }) => {
    //  create a fresh user
    let userResponse = await createUser(apiHelper);

    //get the user

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');
})

// Test:2 Update the User + Verify : AAA
// POST ---> userID --> GET/userId --> PUT /userid  --> GET /userid  --> Verify

test('Update a user', async ({ apiHelper }) => {
    // 1. create a fresh user
    let userResponse = await createUser(apiHelper);

    //2. get the user

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

    //3.Update the user
    let userUpdatedData = {
        name: 'apiautomation-update',
        // email: `apiautomation_${Date.now()}@gmail.com`,
        // gender: 'male',
        status: 'inactive'
    }


    let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect.soft(updateResponse.body.name).toBe(userUpdatedData.name);
    expect.soft(updateResponse.body.status).toBe(userUpdatedData.status);

    //4. Get a updated User
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect(getResponse.body.status).toBe(userUpdatedData.status);
})

// Test:3 Delete the User + Verify : AAA
// POST ---> userID --> GET/userId --> Delete /userid (204)  --> GET /userid (404)  --> Verify

test('Delete a user', async ({ apiHelper }) => {
    // 1. create a fresh user
    let userResponse = await createUser(apiHelper);

    //2. get the user

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

    //3. Delete the user

    let updateResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(updateResponse.status).toBe(204);


    //4. Get a User
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');
  
})


