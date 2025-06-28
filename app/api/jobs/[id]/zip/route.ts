// app/api/jobs[id]/zip/route.ts

import { NextRequest } from "next/server";
import { PassThrough } from "stream";
import archiver from "archiver";
import { bucket } from "@/lib/firebaseAdmin";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  const [files] = await bucket.getFiles({ prefix: `jobs/${jobId}/` });
  
  if (!files.length) {
    return new Response("No files found for this job", { status: 404 });
  }

  const zip = archiver("zip", { zlib: { level: 9 } });
  const stream = new PassThrough();
  
  // This is crucial: zip.pipe() must be called BEFORE you start appending files.
  zip.pipe(stream);

  // --- FIX: Use a sequential loop instead of forEach ---
  for (const file of files) {
    const nameInZip = file.name.replace(`jobs/${jobId}/`, "");
    // Ensure we don't add the root folder itself as an empty entry
    if (nameInZip) {
      // Append the file stream to the archive
      zip.append(file.createReadStream(), { name: nameInZip });
    }
  }
  // --- END FIX ---
  
  // Finalize the archive. This is an async operation.
  await zip.finalize();

  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="job-${jobId}.zip"`,
    },
  });
}