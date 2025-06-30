export async function POST(req) {
  const { province, licenseClass, difficulty } = await req.json();

  const questions = Array.from(
    { length: 30 },
    (_, i) =>
      `Q${
        i + 1
      }: [${province} | ${licenseClass} | ${difficulty}] Sample question ${
        i + 1
      }`
  );

  return Response.json({ questions });
}
