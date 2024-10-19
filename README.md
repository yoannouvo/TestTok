# Agora Token Generator

This is a simple Node.js application that generates Agora RTC tokens using Express. It allows you to dynamically pass your `APP_ID` and `APP_CERTIFICATE` as part of the request body, making it flexible to generate tokens for different Agora applications.

## Setup

1. Clone the repository.
2. Run `npm install` to install the required dependencies.
3. Start the server with:

npm start_____________________________________
## Endpoints

### POST /generate-token

This endpoint generates a token for Agora RTC.

#### Request Body (JSON format)

| Parameter       | Type   | Description                                                        |
|-----------------|--------|--------------------------------------------------------------------|
| `APP_ID`        | string | The Agora application ID.                                          |
| `APP_CERTIFICATE`| string | The Agora application certificate.                                 |
| `channelName`   | string | The name of the channel you want to join.                          |
| `uid`           | number | The user ID (integer or string).                                   |
| `role`          | string | The role of the user in the session: either "publisher" or "subscriber". |

#### Example request:

```json
POST /generate-token
{
"APP_ID": "your-app-id",
"APP_CERTIFICATE": "your-app-certificate",
"channelName": "myChannel",
"uid": 12345,
"role": "publisher"
}

Exemplample reponse______________________________________
json
Copier le code
{
  "token": "006xxxxxxx"  // The generated Agora RTC token
}

Errors___________________________________________
The API returns error messages for invalid or missing parameters:

Status Code	Description
400	Bad Request: Missing or invalid parameters.
500	Internal Server Error: Something went wrong on the server.