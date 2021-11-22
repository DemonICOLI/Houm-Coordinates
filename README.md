# Houm-Coordinates

API for Houmer Coordinates Registration and Querying as per [Definition](docs/definition/Problem-Definition.png)

## Features

- Houmer Coordinates Registration
- Query Houmer visit times on an specific date
- Query Houmer trips over an speed on an specific date

## Tech

- [Typescript] - Typed JavaScript at Any Scale.
- [node.js] - ES6 Compiled from Typescript
- [InversifyJS] - A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.
- [Luxon] - a library for dealing with dates and times in JavaScript.

## Local Development

- [node.js] - V16.13.0

## Build
```sh
npm install
npm run build
```

AWS Lambda Code will be generated as a Zip in the dist folder of each subpackage, CI/CD Code and IaC is not included.

## Testing
```sh
npm install
npm run coverage
```

This command must be executed inside each sub-package folder

## Live Version

A Live version of this code can be found at the following endpoints (Also included as [Postman Collection](docs/postman/HoumApi.postman_collection.json))

- Coordinates Registration: **POST** https://api.softwarevil.com/houm/houmer/{houmerID}/visit
- Visit Query: **GET** https://api.softwarevil.com/houm/houmer/{houmerID}/visit?date=date
- Speed Query: **GET** https://api.softwarevil.com/houm/houmer/{houmerID}/speed?date=date&maxspeed=maxspeed

See: [OpenApi 3](docs/openapi/HoumAPI-dev-oas30-apigateway.yaml)

## Live Architecture

The previous Live Demo is deployed in AWS as follow

![Alt text](docs/diagram/Houm%20Coordinates%20Architecture.png?raw=true "Live Architecture")

## Assumptions

A set of coordinates is registered both on arrival and departure from a site by a houmer

## Posible Improvements

- Schema validation on QueryStrings
- Pagination
- CI/CD Per Project / Currently Using my own
- Local Execution

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>
