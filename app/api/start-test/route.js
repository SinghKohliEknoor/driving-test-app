import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { province, licenseClass, difficulty } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant trained on Alberta driver's test materials. Respond ONLY with a JSON array.",
        },
        {
          role: "user",
          content: `Give 30 random Alberta driving test questions as a JSON array with fields: question, options, answer. Province: ${province}, Class: ${licenseClass}, Difficulty: ${difficulty}`,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;

    const jsonMatch = content.match(/\[\s*{[\s\S]*?}\s*]/);
    if (!jsonMatch) throw new Error("No valid JSON array found in response");

    const questions = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error in /api/start-test:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz." },
      { status: 500 }
    );
  }
}
