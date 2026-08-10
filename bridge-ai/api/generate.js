```js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  var body = req.body || {};
  var system = body.system;
  var message = body.message;

  if (!message) {
    return res.status(400).json({
      error: "Missing message",
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not set on the server",
    });
  }

  try {
    var prompt = message;

    if (system) {
      prompt = system + "\n\n" + message;
    }

    var response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    var data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data &&
          data.error &&
          data.error.message
            ? data.error.message
            : JSON.stringify(data),
      });
    }

    var text = "";

    if (
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts
    ) {
      text = data.candidates[0].content.parts
        .map(function (part) {
          return part.text || "";
        })
        .join("");
    }

    return res.status(200).json({
      content: [
        {
          type: "text",
          text: text,
        },
      ],
      text: text,
    });
  } catch (err) {
    return res.status(500).json({
      error: String(err),
    });
  }
}
```

