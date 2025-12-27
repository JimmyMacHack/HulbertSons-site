export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const details = (body.details || "").toString().trim();
  if (!details) return Response.json({ error: "Missing details" }, { status: 400 });

  const prompt = `
You are a handyman service estimator.
Return: (1) estimate range, (2) hazards/notes, (3) improved description.
Be conservative and include assumptions.

User input: ${details}

Return JSON ONLY:
{
  "estimateText": "EST: $X–$Y (Labor: $A–$B; Materials: $C–$D)",
  "hazards": ["...", "..."],
  "improvedDescription": "..."
}
`.trim();

  const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    prompt,
    max_tokens: 350,
  });

  let out;
  try { out = JSON.parse(result.response); }
  catch { out = { error: "Bad AI response", raw: result.response }; }

  return Response.json(out, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
