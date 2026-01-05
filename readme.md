Text Classification API
Overview

This project is a simple backend service that classifies a given text into one of the following categories:

Complaint

Query

Feedback

Other

The API exposes a single POST endpoint.
An AI language model (via OpenRouter) is used to determine the category, and a basic heuristic is used to assign a confidence score.

This project was built as part of an assignment to demonstrate backend API design and AI integration.

Tech Stack

Node.js

Express.js

Axios

OpenRouter (open-source LLMs)

API Endpoint
POST /classify
Request Body
{
  "text": "My order is delayed and nobody is responding"
}

Response
{
  "category": "Complaint",
  "confidence": 0.8
}

Environment Setup
1. Prerequisites

Node.js (v16 or later)

npm

Check installation:

node -v
npm -v

2. Install dependencies
npm install

3. Environment variables

Create a file named .env in the project root:

OPENROUTER_API_KEY=your_openrouter_api_key_here


The API key is loaded using the dotenv package and is not hardcoded in the source code.

4. Run the server
node index.js


Server will start on:

http://localhost:3000

Testing the API
Using Postman

Method: POST

URL:

http://localhost:3000/classify


Headers:

Content-Type: application/json


Body (raw JSON):

{
  "text": "How can I reset my password?"
}

Using curl
curl -X POST http://localhost:3000/classify \
-H "Content-Type: application/json" \
-d "{\"text\":\"The app keeps crashing when I open it\"}"

Postman Collection (Optional)

A Postman collection is included in the repository.

It contains:

A single request (POST /classify)

Multiple saved Examples for:

Complaint

Query

Feedback

Other

To use:

Open Postman

Click Import

Select the collection JSON file

Start the server and send requests

How AI Was Used

An open-source large language model is accessed via OpenRouter

The model is prompted to classify the input text into one of the predefined categories

The model response is lightly sanitized to remove formatting artifacts (such as newlines or special tokens)

The API does not rely on AI for confidence scores

Confidence Handling

Confidence is estimated using simple heuristics based on:

Detected category

Presence of certain patterns (e.g. questions, negative words)

This keeps the system simple and transparent

Notes

The system is designed for demonstration and assignment purposes

Ambiguous inputs may produce different classifications

No user data is stored

Example Categories
Input Text	Category
“My payment failed but money was deducted”	Complaint
“When will my order be delivered?”	Query
“The app UI looks really clean”	Feedback
“Hello”	Other
Author

Priyanjan Ghosh