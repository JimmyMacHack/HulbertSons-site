export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const details = (body.details || "").toString().trim();
  if (!details) return Response.json({ error: "Missing details" }, { status: 400 });

  const prompt = `
You are an expert handyman estimator for "Hulbert & Sons" in New Orleans.

Context:
- Service Areas: Greater New Orleans, Metairie, Kenner, Gretna, Westbank.
- Common Local Home Types: Shotgun houses, raised cottages, historic homes with cypress siding.
- Common Issues: Humidity damage, termites, settling foundations.
- Pricing: Use reasonable 2025 New Orleans market rates (range estimates only).

Client description: "${details}"

Return JSON ONLY with these keys:
{
  "improved_description": string,
  "questions": string[],
  "category": string,
  "estimated_cost": string,
  "estimated_time": string,
  "difficulty": string,
  "urgency": string,
  "urgency_message": string,
  "safety_tip": string,
  "prep_tip": string
}
`.trim();

  const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    prompt,
    max_tokens: 450,
  });

  let out;
  try {
    out = JSON.parse(result.response);
  } catch {
    return Response.json({ error: "Bad AI response", raw: result.response }, { status: 500 });
  }

  return Response.json(out, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
