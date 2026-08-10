export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is missing",
    });
  }

  const body = req.body || {};
  const message = body.message || "";
  const system = body.system || "";

  if (!message) {
    return res.status(400).json({
      error: "Missing message",
    });
  }

  const prompt = system
    ? `${system}\n\n${message}`
    : message;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1000,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini API status:", response.status);
    console.log("Gemini API response:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Gemini API request failed",
      });
    }

    let text = "";

    if (
      data?.candidates?.length > 0 &&
      data.candidates[0]?.content?.parts
    ) {
      for (const part of data.candidates[0].content.parts) {
        if (part?.text) {
          text += part.text;
        }
      }
    }

    if (!text) {
      return res.status(500).json({
        error: "Gemini returned an empty response",
        raw: data,
      });
    }

    console.log("Gemini generated text:", text);

    return res.status(200).json({
      content: [
        {
          type: "text",
          text,
        },
      ],
      text,
    });
  } catch (error) {
    console.error("Gemini server error:", error);

    return res.status(500).json({
      error: error?.message || String(error),
    });
  }
}
