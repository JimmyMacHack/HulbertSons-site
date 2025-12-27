export async function onRequestPost({ request, env }) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
if (!env.GEMINI_API_KEY) {
  return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY (Cloudflare secret not set)" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
  const question = (body.question || "").toString().trim();
  if (!question) {
    return new Response(JSON.stringify({ error: "Missing 'question' in JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ Put your KB text here for now (fastest + most reliable on Pages)
  // Later you can move it to KV/R2 if it grows.
  const KB = `
Hulbert & Sons provides handyman and home repair services in New Orleans and Houston.
`.trim();

  const prompt = `
You are the Hulbert & Sons website assistant.

Use ONLY the knowledge base below. If the answer isn't in it, say you don't know and offer to take a message.

Style:
- Friendly, professional, concise.
- If the user asks for a quote, ask:
  (1) City (New Orleans or Houston)
  (2) Zip code
  (3) What needs to be done + any photos if possible

KNOWLEDGE BASE:
${KB}

User question: ${question}
`.trim();

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await geminiRes.json();

  const answer =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("")?.trim() ||
    "Sorry — no answer returned.";

  return new Response(JSON.stringify({ answer }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
