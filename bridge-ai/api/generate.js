export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is missing"
    });
  }

  const body = req.body || {};
  const message = body.message || "";
  const system = body.system || "";

  if (!message) {
    return res.status(400).json({
      error: "Missing message"
    });
  }

  let prompt = message;

  if (system) {
    prompt = system + "\n\n" + message;
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 2000,
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data && data.error
            ? data.error.message
            : "Gemini API request failed"
      });
    }

    let text = "";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts
    ) {
      for (
        let i = 0;
        i < data.candidates[0].content.parts.length;
        i++
      ) {
        text += data.candidates[0].content.parts[i].text || "";
      }
    }

    if (!text) {
      return res.status(500).json({
        error: "Gemini returned an empty response",
        raw: data
      });
    }

    return res.status(200).json({
      content: [
        {
          type: "text",
          text: text
        }
      ],
      text: text
    });

  } catch (error) {
    console.error("Gemini API error:", error);

    return res.status(500).json({
      error: String(error)
    });
  }
}
