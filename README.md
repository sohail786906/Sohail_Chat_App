**Real-Time Chat Application**
This is a real-time chat application built with Node.js, Express, MongoDB, and React. The application allows users to create channels, send messages, and manage channel members. The backend is protected with JWT authentication.

**Features
User Authentication: JWT-based protected routes.
Channels: Users can create channels and manage members.
Messaging: Send and receive messages in real-time channels.
Admin Controls: Channel admin can add and remove members.
Prerequisites**
Before running the project, make sure you have:

**Node.js installed.
MongoDB installed or a MongoDB Atlas account.
Installation**
Clone the repository:

bash
Copy code
**git clone https://github.com/sohail786906/chat-app.git**
Navigate to the project directory:

bash
Copy code
cd chat-app
Install the dependencies:

bash
Copy code
npm install
Set up your environment variables:

Create a .env file in the root directory and add the following:

bash
Copy code
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Start the development server:

bash
Copy code
npm run dev
To run the project in production:

bash
Copy code
npm start
API Endpoints
Authentication
Register a User
URL: /api/auth/register

Method: POST

Protected: No

Request Body:

json
Copy code
{
  "username": "sohail",
  "email": "sohail@gmail.com",
  "password": "password@123"
}
Response:

json
Copy code
{
  "message": "User registered successfully",
  "token": "JWT token here"
}
Login a User
URL: /api/auth/login

Method: POST

Protected: No

Request Body:

json
Copy code
{
  "email": "sohail@gmail.com",
  "password": "password@123"
}
Response:

json
Copy code
{
  "message": "Login successful",
  "token": "JWT token here"
}
Channels
Create a Channel
URL: /api/channels/create

Method: POST

Protected: Yes

Request Body:

json
Copy code
{
  "name": "General",
  "members": ["60c72b2f9b1e8a001c4f1d0a", "60c72b2f9b1e8a001c4f1d0b"]
}
Response:

json
Copy code
{
  "message": "Channel created successfully",
  "channel": {
    "name": "General_channel",
    "members": ["60c72b2f9b1e8a001c4f1d0a", "60c72b2f9b1e8a001c4f1d0b"],
    "admin": {
      "_id": "66fac12064736b0e16de6ac0",
      "username": "demo"
    }
  }
}
Get Channels for the Logged-in User
**URL: /api/channels/my-channels**

Method: GET

Protected: Yes

Response:

json
Copy code
[
  {
    "_id": "66faca0f64736b0e16de6ae3",
    "name": "General",
    "members": [...],
    "admin": {...}
  }
]
Add a Member to a Channel
URL: /api/channels/add-member

Method: POST

Protected: Yes

Request Body:

json
Copy code
{
  "channelId": "66faca0f64736b0e16de6ae3",
  "userId": "60c72b2f9b1e8a001c4f1d0d"
}
Response:

json
Copy code
{
  "message": "User added to the channel",
  "channel": {
    "name": "General",
    "members": [...]
  }
}
Remove a Member from a Channel
**URL: /api/channels/remove-member**

Method: POST

Protected: Yes

Request Body:

json
Copy code
{
  "channelId": "66faca0f64736b0e16de6ae3",
  "userId": "60c72b2f9b1e8a001c4f1d0d"
}
Response:

json
Copy code
{
  "message": "User removed from the channel",
  "channel": {
    "name": "General",
    "members": [...]
  }
}
Messages
Send a Message
URL: /api/messages/send

Method: POST

Protected: Yes

Request Body:

json
Copy code
{
  "channelId": "66faca0f64736b0e16de6ae3",
  "content": "Hello, world!"
}
Response:

json
Copy code
{
  "message": "Message sent successfully",
  "message": {
    "content": "Hello, world!",
    "sender": "sohail",
    "channel": "General"
  }
}
Get Messages from a Channel
**URL: /api/messages/:channelId**

Method: GET

Protected: Yes

Response:

json
Copy code
[
  {
    "_id": "1234567890",
    "content": "Hello, world!",
    "sender": "demo",
    "channel": "General"
  }
]
Delete a Message
URL: /api/messages/:messageId

Method: DELETE

Protected: Yes

Response:

json
Copy code
{
  "message": "Message deleted successfully"
}
Testing with Postman
To test the API with Postman:

**Set up Postman with your API base URL: http://localhost:5000**.
In Postman, use the endpoints mentioned above and include the JWT token in the Authorization header for protected routes.
Send requests to the desired routes with the appropriate HTTP methods (GET, POST, DELETE).
Running Tests
You can create integration tests for each endpoint and run them using any testing framework like Jest or Mocha. Here's an example:

bash
Copy code
npm test
License
This project is licensed under the MIT License.

