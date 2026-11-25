// Schema Validation
// ajv --node ib for schema validation
// nom install ajv

import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';
import { ApiHelper } from './ApiHelper';
import fs from 'fs';


const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {

    Authorization: `Bearer ${TOKEN}`
};

//set up the ajv

let ajv = new Ajv()

// deine JSON schema

// let userSchema = {

//     "type": "object",
//     "properties": {
//         "id": {
//             "type": "number"
//         },
//         "name": {
//             "type": "string"
//         },
//         "email": {
//             "type": "string"
//         },
//         "gender": {
//             "type": "string"
//         },
//         "status": {
//             "type": "string"
//         }
//     },
//     "required": [
//         "id",
//         "name",
//         "email",
//         "gender",
//         "status",
//     ]
// };

let userArraySchema = {
    "type": "array",
    "items": JSON.parse(fs.readFileSync('./src/schema/userschema.json', 'utf-8'))
}



test('@smoke get a user  - schema test', async ({ apiHelper }) => {
    let userData = {
        name: 'manoj',
        email: `manoj${Date.now()}@gmail.com`, //unique email, GoRest rejects duplicates with 422
        gender: 'male',
        status: 'active'
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);

    expect((response).status).toBe(201); //create user
    let userId = response.body.id;
    console.log('created userid-POST:', userId);

    //get a user :

    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    // verify the response schema

    //let validate = ajv.compile(userSchema);
    let validate = ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userschema.json', 'utf-8')));
    let isSchemaValid = validate(getUserResponse.body);
    if (!isSchemaValid) {
        console.log("Schema Errors:", validate.errors);
    }
    expect(isSchemaValid).toBeTruthy();
})

test('@smoke get all user schema  - schema test', async ({ apiHelper }) => {
    // let userData = {
    //     name: 'manoj',
    //     email: `manoj${Date.now()}@gmail.com`, //unique email, GoRest rejects duplicates with 422
    //     gender: 'male',
    //     status: 'active'
    // }

    // let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);

    // expect((response).status).toBe(201); //create user
    // let userId = response.body.id;
    // console.log('created userid-POST:', userId);

    //get all user :

    let getUsersResponse = await apiHelper.get(`/public/v2/users/`, AUTH_HEADER);
    expect(getUsersResponse.status).toBe(200);

    // verify the response schema

    let validate = ajv.compile(userArraySchema);
    let isSchemaValid = validate(getUsersResponse.body);
    if (!isSchemaValid) {
        console.log("Schema Errors:", validate.errors);
    }
    expect(isSchemaValid).toBeTruthy();
})
