export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const question = (body.question || "").toString().trim();

  if (!question) {
    return new Response(JSON.stringify({ error: "Missing 'question' in JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Put your real KB here (or later move to KV/R2)
  const KB = `
Hulbert & Sons provides handyman and home repair services in New Orleans and Houston.
(Replace this with your actual knowledge base.)
`.trim();

  const system = `
You are the Hulbert & Sons website assistant.
Use ONLY the knowledge base below. If it's not in it, say you don't know and offer to take a message.

KNOWLEDGE BASE:
${KB}
`.trim();

  const prompt = `${system}\n\nUser: ${question}\nAssistant:`;

  const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    prompt,
    max_tokens: 300,
  });

  const answer =
    (result?.response || "").toString().trim() || "Sorry — no answer returned.";

  return new Response(JSON.stringify({ answer }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
