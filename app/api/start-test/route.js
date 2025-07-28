import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  try {
    // 1. Fetch all questions
    const { data, error } = await supabase
      .from("alberta_class7")
      .select("*")
      .limit(1000);

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: "DB fetch failed" }, { status: 500 });
    }

    // 2. Group by base question (e.g., Q1, Q2, ..., Q108)
    const grouped = {};
    data.forEach((q) => {
      const baseTag = q.version_tag.split("_")[0]; // e.g., "Q12"
      if (!grouped[baseTag]) grouped[baseTag] = [];
      grouped[baseTag].push(q);
    });

    // 3. Pick one random variant per base question
    const uniqueVariants = Object.values(grouped).map((variants) => {
      const randomIndex = Math.floor(Math.random() * variants.length);
      return variants[randomIndex];
    });

    // 4. Shuffle and take 30
    const shuffled = uniqueVariants.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 30);

    return NextResponse.json({ questions: selected });
  } catch (err) {
    console.error("Unexpected error in start-test:", err);
    return NextResponse.json(
      { error: "Failed to fetch questions." },
      { status: 500 }
    );
  }
}
