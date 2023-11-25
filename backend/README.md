## Overview
The Backend Service is designed to enhance the functionality of MedAssist medication adherence application. It's built with Node.js and the Express framework and uses MongoDB Atlas for data storage.

## Key Features
1. User Authentication via email address and secure password.
2. Patients can enter their medication details and set up reminders at specific times (email).
3. Medication adherence tracking system where users can mark a medication as "taken" or "missed".
4. Healthcare providers can access patients data and adherence reports

## Usage
The API is hosted at https://medassist-api.onrender.com and it supports the following endpoints:

`POST ${BASE_URL}/api/v1/auth/signup`: Register a user.
`POST ${BASE_URL}/api/v1/auth/login`: Allows a registered user to login.

`POST ${BASE_URL}/api/v1/med`: Create a new medication record.
`GET ${BASE_URL}/api/v1/med`: Get the information about all the medication records.
`GET ${BASE_URL}/api/v1/med/:id`: Get the information about a specific medication record.
`PUT ${BASE_URL}/api/v1/med/:id`: Update a medication record.
`DELETE ${BASE_URL}/api/v1/med/:id`: Delete a medication record.
`GET ${BASE_URL}/api/v1/med/report`: Get Patient's Adherence Report sent to email.

where BASE_URL = https://medassist-api.onrender.com

...

**Note: I didn't use try-catch in my controllers because I'm using the express-async-error (an async wrapper) that automatically wraps my all my async functions in a try-catch block and passes the error to the next middleware**

