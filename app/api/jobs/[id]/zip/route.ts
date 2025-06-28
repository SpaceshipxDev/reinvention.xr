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
  if (!files.length) return new Response("No files", { status: 404 });

  const zip = archiver("zip", { zlib: { level: 9 } });
  const stream = new PassThrough();
  zip.pipe(stream);

  files.forEach(f => {
    const nameInZip = f.name.replace(`jobs/${jobId}/`, "");
    if (nameInZip) zip.append(f.createReadStream(), { name: nameInZip });
  });
  zip.finalize();

  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="job-${jobId}.zip"`,
    },
  });
}