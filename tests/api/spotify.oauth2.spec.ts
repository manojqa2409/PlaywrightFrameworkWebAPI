import { test, expect } from '@playwright/test';
import { OutgoingMessage, request } from 'http';


// Created object for OAuth details to use further
let OAUTH_CONFIG = {
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
}

let accessToken: string;

//To generate access token before each test to test the API

test.beforeEach('POST - generate the access token', async ({ request }) => {
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    })
    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log('token api response: ', jsonResponse);
    accessToken = jsonResponse.access_token;
    console.log('access_token: ', accessToken);


})

test('@regression GET - Albums data test', async ({ request }) => {
    //https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy

    let baseURL = 'https://api.spotify.com';
    let endPointURL = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'

    let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    expect(albumResponse.status()).toBe(200);
    console.log(await albumResponse.json());

    let jsonBody =  await albumResponse.json();
    console.log('Album  Type: ', jsonBody.album_type);
    console.log('Total Tracks: ', jsonBody.total_tracks);
    console.log('Spotify URL: ', jsonBody.external_urls.spotify);
    console.log('Image Count: ', jsonBody.images.length);
    expect(jsonBody.images.length).toBe(3)


})