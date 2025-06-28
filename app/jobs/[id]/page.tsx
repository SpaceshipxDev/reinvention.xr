// src/app/jobs/[id]/page.tsx

"use client";
import { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore"; // ► Import firestore methods
import { db } from "@/lib/firebase"; // ► Import db instance
import { JobMeta } from "@/components/JobRow"; // ► Import JobMeta type

/** recursively collect every StorageReference under a folder */
async function collectFiles(r: ReturnType<typeof ref>): Promise<string[]> {
  const res  = await listAll(r);
  const here = res.items.map(i => i.fullPath);
  const deeperArrays = await Promise.all(res.prefixes.map(collectFiles));
  return [...here, ...deeperArrays.flat()];
}

export default function JobFilesPage({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [jobMeta, setJobMeta] = useState<JobMeta | null>(null); // ► State for metadata
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    (async () => {
      setLoading(true);
      const storage   = getStorage();

      // ► Fetch both Firestore doc and Storage files in parallel
      const [docSnap] = await Promise.all([
        getDoc(doc(db, "jobs", jobId)),
        // The file fetching logic remains the same
        (async () => {
            const rootRef = ref(storage, `jobs/${jobId}`);
            const paths = await collectFiles(rootRef);
            const all = await Promise.all(
              paths.map(async p => ({
                name: p.replace(`jobs/${jobId}/`, ""),
                url:  await getDownloadURL(ref(storage, p))
              }))
            );
            setFiles(all);
        })(),
      ]);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setJobMeta({
          id: data.id,
          folder: data.folder,
          fileCount: data.fileCount,
          createdAtMs: data.createdAt ? data.createdAt.toMillis() : null,
          meta: data.meta || "",
        });
      }
      setLoading(false);
    })();
  }, [jobId]);

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Job Details: {jobMeta?.folder || jobId}</h1>

      {loading ? (
        <p>Loading job details...</p>
      ) : (
        <>
          {/* ► Section to display the full metadata */}
          {jobMeta?.meta && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Metadata</h3>
              <p className="text-gray-800 whitespace-pre-wrap font-mono text-sm">
                {jobMeta.meta}
              </p>
            </div>
          )}

          <h2 className="text-xl font-bold mb-4">Files</h2>
          {files.length === 0 ? (
            <p className="text-gray-500">No files found in this job.</p>
          ) : (
            <ul className="space-y-2">
              {files.map(f => (
                <li key={f.name} className="flex justify-between items-center border-b py-2">
                  <span className="font-mono truncate">{f.name}</span>
                  <a
                    href={f.url}
                    download={f.name}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}