// src/app/api/search/route.ts

import { GoogleGenAI } from "@google/genai";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { JobMeta } from "@/components/JobRow";
import { NextRequest, NextResponse } from "next/server";

// API key is pulled from GOOGLE_API_KEY in .env.local automatically.
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

function formatJobsForAI(jobs: JobMeta[]): string {
  return jobs
    .map(j => `Job ID: ${j.id}\nMetadata: ${j.meta || "No metadata"}\n`)
    .join("---\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const searchQuery = body.query;

    if (!searchQuery) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    // Fetch all jobs from Firestore
    const q = query(collection(db, "jobs"));
    const snap = await getDocs(q);
    const allJobs: JobMeta[] = snap.docs.map(d => {
      const data = d.data();
      return {
        id: data.id,
        folder: data.folder,
        fileCount: data.fileCount,
        meta: data.meta || "",
        createdAtMs: data.createdAt ? data.createdAt.toMillis() : null,
      };
    });

    if (allJobs.length === 0) {
      return NextResponse.json([]);
    }

    // Prepare the prompt for Gemini
    const context = formatJobsForAI(allJobs);
    const prompt = `You are an intelligent search assistant for a job management system.
    Your task is to find the most relevant jobs based on a user's query.

    Here is the full list of available jobs, each with a Job ID and its associated Metadata:
    ---
    ${context}
    ---

    Now, analyze the following user query and identify the most relevant Job IDs from the list above.
    User Query: "${searchQuery}"

    Your response MUST be a single line of text containing ONLY the relevant Job IDs, separated by commas. Do not include any other text, explanations, or formatting.
    For example: id-abc-123,id-def-456`;

    // Use new 2025 Gemini API
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-preview-06-17", // Use your preferred model here
      contents: prompt,
    });

    const aiResponseText = aiResponse.text; // No .response, it's direct

    // Parse the AI's response
    const relevantIds = aiResponseText.split(",").map(id => id.trim());
    const relevantJobs = allJobs.filter(job => relevantIds.includes(job.id));

    return NextResponse.json(relevantJobs);

  } catch (error) {
    console.error("Error in AI search:", error);
    return NextResponse.json({ error: "Failed to perform AI search" }, { status: 500 });
  }
}