// netlify/functions/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Handle GET requests for testing
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Gemini function is working!",
        timestamp: new Date().toISOString(),
        hasApiKey: !!process.env.GEMINI_API_KEY,
        environment: process.env.NODE_ENV || "production",
      }),
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse request body
    const { prompt, model } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Prompt is required" }),
      };
    }

    // Initialize Gemini AI with API key from environment variable
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    if (!process.env.GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    // Get the generative model
    const generativeModel = genAI.getGenerativeModel({ model });

    // Generate content
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        response: text,
      }),
    };
  } catch (error) {
    console.error("Gemini API Error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to generate content",
        details: error.message,
      }),
    };
  }
};
