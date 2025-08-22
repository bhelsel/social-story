// src/services/geminiService.js

// Use local Netlify dev server in development, production URL in production
const isDevelopment = process.env.NODE_ENV === "development";
const NETLIFY_FUNCTION_URL = isDevelopment
  ? "http://localhost:8888/.netlify/functions/gemini"
  : "/.netlify/functions/gemini";

async function callGeminiAPI(prompt, model = "gemini-1.5-flash") {
  try {
    const response = await fetch(NETLIFY_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return { response: data.response, sessionId: data.sessionId };
    } else {
      throw new Error(data.error || "Unknown error occurred");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

export default callGeminiAPI;
