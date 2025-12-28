import fs from "fs";
import path from "path";

function loadPricebook() {
  const p = path.join(process.cwd(), "data", "pricebook.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function normalize(s) {
  return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function matchItem(details, items) {
  const text = normalize(details);
  let best = null;
  let bestScore = 0;

  for (const item of items) {
    let score = 0;
    for (const kw of item.keywords || []) {
      if (text.includes(normalize(kw))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore > 0 ? best : null;
}

function money(n) {
  return `$${Math.round(n)}`;
}

export default async (req) => {
  let body = {};
  try { body = await req.json(); } catch {}

  const details = (body.details || "").toString().trim();
  if (!details) {
    return Response.json({ error: "Missing 'details' in JSON body." }, { status: 400 });
  }

  const book = loadPricebook();
  const item = matchItem(details, book.items || []);

  // Fallback if nothing matched
  if (!item) {
    const trip = book.base_trip_fee ?? 95;
    const min = trip + 95;
    const max = trip + 285;
    return Response.json({
      improved_description: details,
      questions: [
        "Is this inside or outside?",
        "Any photos you can upload?",
        "When did it start and is it getting worse?"
      ],
      category: "General",
      estimated_cost: `${money(min)}–${money(max)}`,
      estimated_time: "1–3 hours",
      difficulty: "Unknown",
      urgency: "Medium",
      urgency_message: "We can give a tighter quote with photos and a quick call.",
      safety_tip: "If water/electric are involved, shut off at the source if safe.",
      prep_tip: "Clear the work area and take 2–3 photos."
    });
  }

  const laborRate = book.default_labor_rate ?? 95;
  const trip = book.base_trip_fee ?? 95;

  const laborMin = item.labor_hours_min * laborRate;
  const laborMax = item.labor_hours_max * laborRate;

  const totalMin = trip + laborMin + (item.materials_min ?? 0);
  const totalMax = trip + laborMax + (item.materials_max ?? 0);

  return Response.json({
    improved_description: item.improved_description || details,
    questions: item.questions || [
      "Any photos you can upload?",
      "Is there active leaking right now?",
      "What brand/model (if known)?"
    ],
    category: item.category || "General",
    estimated_cost: `${money(totalMin)}–${money(totalMax)}`,
    estimated_time: `${item.labor_hours_min}–${item.labor_hours_max} hours`,
    difficulty: item.difficulty || "Medium",
    urgency: item.urgency || "Medium",
    urgency_message: item.urgency_message || "",
    safety_tip: item.safety_tip || "",
    prep_tip: item.prep_tip || ""
  });
};

export const config = { path: "/api/estimate" };
