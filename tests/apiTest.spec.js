const { test, expect } = require("@playwright/test");
const { default: Ajv } = require("ajv");


const ajv = new Ajv();


test('GET Request', async ({request}) => {
    // const response = await request.get("https://api.restful-api.dev/objects")
    // console.log(await response.json());

    // expect(response.status()).toEqual(200)
    // expect(response.ok()).toBeTruthy()
    
});

test('POST Request', async ({request}) => {

    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {
        
            "name": "Apple MacBook SUPER ZUMBA",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         

    }

    const response = await request.post("https://api.restful-api.dev/objects", {
        headers:reqHeaders, 
        data:body
    })
    //console.log(await response.json());
    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(resBody.name).toEqual('Apple MacBook SUPER ZUMBA')

    const valid = ajv.validate(require("../json-schema/add-object.schema.json"), resBody);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
        
    }
    expect(valid).toBe(true);
});



