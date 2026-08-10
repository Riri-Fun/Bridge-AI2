```js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  var body = req.body || {};
  var message = body.message || "";
  var system = body.system || "";

  if (!message) {
    return res.status(400).json({
      error: "Missing message"
    });
  }

  var apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not set on the server"
    });
  }

  var prompt = message;

  if (system) {
    prompt = system + "\n\n" + message;
  }

  try {
    var response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 1000
          }
        })
      }
    );

    var data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error && data.error.message
          ? data.error.message
          : "Gemini API request failed"
      });
    }

    var text = "";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts
    ) {
      for (var i = 0; i < data.candidates[0].content.parts.length; i++) {
        text += data.candidates[0].content.parts[i].text || "";
      }
    }

    if (!text) {
      return res.status(500).json({
        error: "Gemini returned an empty response"
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
    return res.status(500).json({
      error: String(error)
    });
  }
}
```
