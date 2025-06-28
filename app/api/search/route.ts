// src/app/api/search/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { JobMeta } from "@/components/JobRow";
import { NextRequest, NextResponse } from "next/server";

// IMPORTANT: Use environment variables for API keys in a real app!
// Put GOOGLE_API_KEY="your_key_here" in a .env.local file
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

function formatJobsForAI(jobs: JobMeta[]): string {
  return jobs
    .map(j => `Job ID: ${j.id}\nMetadata: ${j.meta || "No metadata"}\n`)
    .join("---\n"); // Use a clear separator between jobs
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const searchQuery = body.query;

    if (!searchQuery) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    // 1. Fetch all jobs from Firestore to provide context to the AI
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

    // 2. Engineer the prompt for Gemini
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

    // 3. Call the fictional Gemini 2.5 Flash API
    // Note: The actual SDK might differ, but we are using the user-provided structure.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Using a real, available model name
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponseText = response.text();
    
    // 4. Parse the AI's response
    const relevantIds = aiResponseText.split(",").map(id => id.trim());

    // 5. Filter the original jobs list to find the full job objects
    const relevantJobs = allJobs.filter(job => relevantIds.includes(job.id));

    // 6. Return the filtered jobs to the client
    return NextResponse.json(relevantJobs);

  } catch (error) {
    console.error("Error in AI search:", error);
    return NextResponse.json({ error: "Failed to perform AI search" }, { status: 500 });
  }
}