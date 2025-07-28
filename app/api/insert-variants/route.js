// app/api/insert-variants/route.js

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  try {
    // Step 1: Read the file from the public folder
    const filePath = path.join(
      process.cwd(),
      "public",
      "generated_variants.json"
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const variants = JSON.parse(fileContent);

    if (!Array.isArray(variants)) {
      throw new Error("Invalid data format: Expected an array of variants");
    }

    // Step 2: Insert into Supabase
    const { error } = await supabase.from("alberta_class7").insert(
      variants.map((q) => ({
        question_text: q.question_text,
        options: q.options,
        answer: q.answer,
        version_tag: q.version_tag,
        created_by: "openai-assistant",
      }))
    );

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, inserted: variants.length });
  } catch (error) {
    console.error("Error inserting variants from file:", error);
    return NextResponse.json(
      { error: "Insert operation failed." },
      { status: 500 }
    );
  }
}
