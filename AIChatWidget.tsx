const FAQ = [
  { q: /hours|open/i, a: "We operate Monday–Friday, 8am–6pm." },
  { q: /service|do you/i, a: "We offer handyman and home repair services in New Orleans and Houston." },
];

function getReply(input: string) {
  return FAQ.find(f => f.q.test(input))?.a
    || "I can help with services, pricing, or scheduling. What would you like to know?";
}
