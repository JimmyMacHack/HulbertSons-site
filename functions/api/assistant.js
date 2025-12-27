import fs from "fs";
import path from "path";
import process from "process";
import OpenAI from "openai";

function loadKB() {
  const kbPath = path.join(process.cwd(), "data", "hulbert_kb.txt");
  return fs.readFileSync(kbPath, "utf8");
}

export default async (req) => {
  let body = {};
  try {
    body = await req.json();
  } catch {}

  const question = (body.question || "").toString().trim();
  if (!question) {
    return Response.json(
      { error: "Missing 'question' in JSON body." },
      { status: 400 }
    );
  }

  // Netlify AI Gateway injects base URL in the compute environment.
  // If it's missing, your site isn't running with AI Gateway enabled.
  if (!process.env.OPENAI_BASE_URL) {
    return Response.json(
      {
        error:
          "AI Gateway not detected. Confirm AI Gateway is enabled and the site has had a production deploy.",
      },
      { status: 500 }
    );
  }

  const kb = loadKB();

  const system = `
You are the Hulbert & Sons website assistant.

Use ONLY the knowledge base below. If the answer isn't in it, say you don't know and offer to take a message.

Style:
- Friendly, professional, concise.
- If the user asks for a quote, ask:
  (1) City (New Orleans or Houston)
  (2) Zip code
  (3) What needs to be done + any photos if possible

KNOWLEDGE BASE:
${kb}
`.trim();

  try {
    const client = new OpenAI();

    const res = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: question },
      ],
      reasoning: { effort: "minimal" },
    });

    return Response.json({
      answer: (res.output_text || "").trim(),
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};

export const config = {
  path: "/api/assistant",
};
