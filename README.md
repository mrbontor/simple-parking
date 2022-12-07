
# SIMPLE-PARKING-API

Simple Parking API

Main logic is on the Parking Service

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

- [Git](https://www.odoo.com/documentation/15.0/contributing/documentation.html#install-git)
- [Node JS >= 14.15](https://nodejs.org/en/blog/release/v14.17.3/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Ajv](https://ajv.js.org/guide/getting-started.html)
- [Docker and Docker Compose](https://docs.docker.com/get-docker/) 
- [Postman](https://learning.postman.com/docs/getting-started/introduction/) (Optional)

Note : _I dont finish the Unit Test yet, but i have provided all the API serive including test case for every `endpoints` in folder [/postman](https://github.com/mrbontor/simple-parking/blob/master/postman/KEDA-TECH.postman_collection.json)_


### Settings & Configuring

#### App config


Please check the file `env.example` and change to `.env`


### Deployment && Testing

#### Deployment && Usage

By default, you can run this service following command below:

```sh
# install dependencies
$ npm install

# run app
$ npm start

# or
$ node index.js
```

And you can also running thi service using `Docker` and `Docker-Compose`

```sh
# start
$ docker-compose up

# stop
$ docker-compose down

# remove
$ docker-compose down -v
```
#### Running the test

As i mentioned before, the `Unit Test Code` not finish yet, but already finish with documentation in [/postman](https://github.com/mrbontor/booking-service/tree/main/postman)


how to run:

```sh
# start
$ npm test
```

#### Running in Postman

Please follow this [Postman Doc Import Api](https://learning.postman.com/docs/designing-and-developing-your-api/importing-an-api/) for better information







## Endpoints

* [TYPE](#type)
    1. [CREATE](#1-create)
        * [Success](#i-example-request-success)
        * [Success with only field name](#ii-example-request-success-with-only-field-name)
        * [Validation Error](#iii-example-request-validation-error)
        * [Invalid Name](#iv-example-request-invalid-name)
    1. [GET ALL](#2-get-all)
        * [Success](#i-example-request-success-1)
    1. [GET ONE](#3-get-one)
        * [Success](#i-example-request-success-2)
        * [Not found error](#ii-example-request-not-found-error)
    1. [PUT](#4-put)
        * [Success](#i-example-request-success-3)
        * [Validation error](#ii-example-request-validation-error)
        * [Not found error](#iii-example-request-not-found-error)
    1. [DELETE](#5-delete)
        * [Success](#i-example-request-success-4)
* [PARKING](#parking)
    1. [CREATE](#1-create-1)
        * [Success](#i-example-request-success-5)
        * [Type not found](#ii-example-request-type-not-found)
        * [Duplicate Clock In](#iii-example-request-duplicate-clock-in)
        * [Validation error](#iv-example-request-validation-error)
    1. [GET ALL](#2-get-all-1)
        * [Success](#i-example-request-success-6)
        * [Success with filter date ranges](#ii-example-request-success-with-filter-date-ranges)
        * [Success with filter type](#iii-example-request-success-with-filter-type)
        * [Success with filter by amount](#iv-example-request-success-with-filter-by-amount)
        * [No data found](#v-example-request-no-data-found)
    1. [GET ONE](#3-get-one-1)
        * [Success](#i-example-request-success-7)
        * [GET ONE](#ii-example-request-get-one)
    1. [PUT](#4-put-1)
        * [Success](#i-example-request-success-8)
        * [Duplicate Clock Out](#ii-example-request-duplicate-clock-out)
        * [Not found](#iii-example-request-not-found)
        * [Validation additional error](#iv-example-request-validation-additional-error)
        * [Validation Error](#v-example-request-validation-error)
    1. [DELETE](#5-delete-1)
        * [DELETE](#i-example-request-delete)
        * [Not found](#ii-example-request-not-found)
        * [Cant remove](#iii-example-request-cant-remove)

--------



## TYPE

CRUD for `Type Transpor`t, use `JSON` payload.



### 1. CREATE


Create Type Transport , use JSON payload


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/types
```



***Body:***

```js        
{
    "name": "motor"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "name": "mobil",
    "description": "mobil",
    "status": true
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "id": 1,
        "name": "mobil",
        "description": "mobil",
        "status": true
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Success with only field name



***Body:***

```js        
{
    "name": "motor"
}
```



#### II. Example Response: Success with only field name
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "id": 2,
        "name": "motor",
        "description": null,
        "status": true
    }
}
```


***Status Code:*** 200

<br>



#### III. Example Request: Validation Error



#### III. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "name",
            "key": "required",
            "message": "Name is required!"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### IV. Example Request: Invalid Name



***Body:***

```js        
{
    "name": "motors"
}
```



#### IV. Example Response: Invalid Name
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "name",
            "key": "enum",
            "message": "Only allowed for mobil and motor"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 2. GET ALL


Fetch all list `Type Transport`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/types
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": 1,
            "name": "mobil",
            "description": "mobil",
            "status": true
        },
        {
            "id": 2,
            "name": "motor",
            "description": null,
            "status": true
        },
        {
            "id": 3,
            "name": "honda",
            "description": null,
            "status": true
        }
    ]
}
```


***Status Code:*** 200

<br>



### 3. GET ONE


Fetch a single `Type Transport`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/types/5
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "id": 1,
        "name": "mobil",
        "description": "mobil",
        "status": true
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Not found error



***Body: None***



#### II. Example Response: Not found error
```js
{
    "status": false,
    "message": "Type Transport is not found!"
}
```


***Status Code:*** 400

<br>



### 4. PUT


Update `Type Transport`, use `JSON` payload to update a type


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{local}}/v1/types/1
```



***Body:***

```js        
{
    "name": "mobil",
    "description": "for mobil"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "name": "mobil",
    "description": "for mobil"
}
```



***Status Code:*** 204

<br>



#### II. Example Request: Validation error



***Body:***

```js        
{
   
}
```



#### II. Example Response: Validation error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "name",
            "key": "required",
            "message": "Name is required!"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Not found error



***Body:***

```js        
{
    "name": "mobil",
    "description": "for mobil"
}
```



#### III. Example Response: Not found error
```js
{
    "status": false,
    "message": "Type Transport not found!"
}
```


***Status Code:*** 400

<br>



### 5. DELETE


Delete a single `Type Transport` using `ID`


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{local}}/v1/types/3
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



***Status Code:*** 204

<br>



## PARKING

There is logic when we are creating a new Parkir, specially for the Clock In and Clock Out

Clock In will be handle by System, but user can also add custom time

thats also happen when Updating the Parking Data

Please check it out on _PUT_ Parking API



### 1. CREATE


Create `Parking` use `JSON` payload to create data


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/parking
```



***Body:***

```js        
{
    "typeId": 2,
    "plate": "AC 1234 MTR",
    "color": "black",
    "clockIn": "2022-11-02 10:10:10"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "typeId": 2,
    "plate": "AC 1234 ASD",
    "color": "red",
    "clockIn": "2022-11-02 10:10:10"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "id": 1,
        "typeId": 2,
        "plate": "AC 1234 ASD",
        "clockIn": "2022-11-02T03:10:10.000Z",
        "description": null,
        "status": true,
        "amount": 0,
        "clockOut": null
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Type not found



***Body:***

```js        
{
    "typeId": 5,
    "plate": "AC 1234 ASD",
    "color": "red",
    "clockIn": "2022-11-02 10:10:10"
}
```



#### II. Example Response: Type not found
```js
{
    "status": false,
    "message": "Type Transport not found!"
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Duplicate Clock In



***Body:***

```js        
{
    "typeId": 2,
    "plate": "AC 1234 MTR",
    "color": "black",
    "clockIn": "2022-11-02 10:10:10"
}
```



#### III. Example Response: Duplicate Clock In
```js
{
    "status": false,
    "message": "The transport need to clock out first!"
}
```


***Status Code:*** 422

<br>



#### IV. Example Request: Validation error



***Body:***

```js        
{
    
}
```



#### IV. Example Response: Validation error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "typeId",
            "key": "required",
            "message": "must have required property 'typeId'"
        },
        {
            "param": "plate",
            "key": "required",
            "message": "Plate is required!"
        },
        {
            "param": "color",
            "key": "required",
            "message": "Transport color is required!"
        },
        {
            "param": "clockIn",
            "key": "required",
            "message": "Clock In is required!"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 2. GET ALL


Fetch all data `Parking`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/parking
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": 1,
            "plate": "AC 1234 ASD",
            "typeId": 2,
            "clockIn": "2022-11-02T03:10:10.000Z",
            "clockOut": null,
            "amount": 0,
            "description": null,
            "status": true,
            "type": {
                "type_id": 1,
                "name": "mobil"
            }
        },
        {
            "id": 2,
            "plate": "AC 1234 MTR",
            "typeId": 2,
            "clockIn": "2022-11-02T03:10:10.000Z",
            "clockOut": null,
            "amount": 0,
            "description": null,
            "status": true,
            "type": {
                "type_id": 2,
                "name": "motor"
            }
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Success with filter date ranges



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| startDate | 2022-11-01 |  |
| endDate | 2022-12-02 |  |



***Body: None***



#### II. Example Response: Success with filter date ranges
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": 1,
            "plate": "AC 1234 ASD",
            "typeId": 2,
            "clockIn": "2022-11-02T03:10:10.000Z",
            "clockOut": null,
            "amount": 0,
            "description": null,
            "status": true,
            "type": {
                "type_id": 1,
                "name": "mobil"
            }
        },
        {
            "id": 2,
            "plate": "AC 1234 MTR",
            "typeId": 2,
            "clockIn": "2022-11-02T03:10:10.000Z",
            "clockOut": null,
            "amount": 0,
            "description": null,
            "status": true,
            "type": {
                "type_id": 2,
                "name": "motor"
            }
        }
    ]
}
```


***Status Code:*** 200

<br>



#### III. Example Request: Success with filter type



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| type | motor |  |



***Body: None***



#### III. Example Response: Success with filter type
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": 2,
            "plate": "AC 1234 MTR",
            "typeId": 2,
            "clockIn": "2022-11-02T03:10:10.000Z",
            "clockOut": null,
            "amount": 0,
            "description": null,
            "status": true,
            "type": {
                "type_id": 2,
                "name": "motor"
            }
        }
    ]
}
```


***Status Code:*** 200

<br>



#### IV. Example Request: Success with filter by amount



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| amountFrom | 1000 |  |
| amountTo | 1000000 |  |



***Body: None***



#### IV. Example Response: Success with filter by amount
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": 1,
            "plate": "AC 1234 ASD",
            "typeId": 2,
            "clockIn": "2022-11-02T03:10:10.000Z",
            "clockOut": "2022-11-02T11:00:00.000Z",
            "amount": 2000,
            "description": null,
            "status": false,
            "type": {
                "type_id": 1,
                "name": "mobil"
            }
        }
    ]
}
```


***Status Code:*** 200

<br>



#### V. Example Request: No data found



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| type | motorsss |  |



***Body: None***



#### V. Example Response: No data found
```js
{
    "status": false,
    "message": "No data"
}
```


***Status Code:*** 404

<br>



### 3. GET ONE


Fetch a singel ata `Parking` using `ID`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/parking/2
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "id": 1,
        "plate": "AC 1234 ASD",
        "typeId": 2,
        "clockIn": "2022-11-02T03:10:10.000Z",
        "clockOut": null,
        "amount": 0,
        "description": null,
        "status": true
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: GET ONE



***Body: None***



#### II. Example Response: GET ONE
```js
{
    "status": false,
    "message": "Parkir Id is not found!"
}
```


***Status Code:*** 404

<br>



### 4. PUT


This `Endpoint` is used to handle the bisnis logic, therefore there are `4 Validation` for request payload


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{local}}/v1/parking/4
```



***Body:***

```js        
{
    "clockOut": "2022-11-02 18:00:00"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "clockOut": "2022-11-02 18:00:00"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        1
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Duplicate Clock Out



***Body:***

```js        
{
    "clockOut": "2022-11-02 18:00:00"
}
```



#### II. Example Response: Duplicate Clock Out
```js
{
    "status": false,
    "message": "The transport need to clock in first!"
}
```


***Status Code:*** 422

<br>



#### III. Example Request: Not found



***Body:***

```js        
{
    "clockOut": "2022-11-02 18:00:00"
}
```



#### III. Example Response: Not found
```js
{
    "status": false,
    "message": "Parkir Id is not found!"
}
```


***Status Code:*** 404

<br>



#### IV. Example Request: Validation additional error



***Body:***

```js        
{
    "clockIn": "2022-11-02 18:00:00"
}
```



#### IV. Example Response: Validation additional error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "clockIn",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        },
        {
            "param": "clockOut",
            "key": "type",
            "message": "Clock In must be string date"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### V. Example Request: Validation Error



***Body:***

```js        
{
    
}
```



#### V. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "clockOut",
            "key": "type",
            "message": "Clock In must be string date"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 5. DELETE


Remove a single data `Parking` by `ID`


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{local}}/v1/parking/2
```



***More example Requests/Responses:***


#### I. Example Request: DELETE



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: Not found



***Body: None***



#### II. Example Response: Not found
```js
{
    "status": false,
    "message": "Parkir Id is not found!"
}
```


***Status Code:*** 404

<br>



#### III. Example Request: Cant remove



***Body: None***



#### III. Example Response: Cant remove
```js
{
    "status": false,
    "message": "Sorry, you cant remove this, the transport still inside!"
}
```


***Status Code:*** 422

<br>



---
[Back to top](#simple-parking-api)