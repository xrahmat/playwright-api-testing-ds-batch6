const { test, expect } = require("@playwright/test");
const { default: Ajv } = require("ajv");
const ajv = new Ajv();


test('GET Request', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users?page=2")
    console.log(await response.json());

    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    const validate = ajv.compile(require("../json-schema/get-object.schema.json"));

    const valid = validate(response.json())

        if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
        
    }
    
});

test('POST Request', async ({request}) => {

    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {
        "name": "Rahmat",
        "job": "leader"
    }

    const response = await request.post("https://reqres.in/api/users", {
        headers:reqHeaders, 
        data:body
    })
    //console.log(await response.json());
    expect(response.status()).toEqual(201)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(resBody.name).toEqual('Rahmat')

    const valid = ajv.validate(require("../json-schema/add-object.schema.json"), resBody);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
        
    }
    expect(valid).toBe(true);
});

test('UPDATE Request', async ({ request }) => {
    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {
        "name": "morpheus",
        "job": "zion resident"
    }

    const response = await request.put("https://reqres.in/api/users/2", {
        headers:reqHeaders, 
        data:body
    })

    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(resBody.name).toEqual('morpheus')
    expect(resBody.job).toEqual('zion resident')

    const valid = ajv.validate(require("../json-schema/update-object.schema.json"), resBody);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
        
    }
    expect(valid).toBe(true);

});

test('DELETE Request', async ({ request }) => {
    const reqHeaders = {
        Accept: 'application/json'
    }
    const response = await request.delete("https://reqres.in/api/users/2", {
        headers:reqHeaders
    })

    await expect(response.status()).toEqual(204);
});


