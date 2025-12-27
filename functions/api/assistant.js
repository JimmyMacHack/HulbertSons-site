export async function onRequestPost({ request, env }) {
  const { question } = await request.json();

  if (!question) {
    return new Response(
      JSON.stringify({ error: "Missing question" }),
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  return new Response(
    JSON.stringify({
      answer:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t find that information.",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
