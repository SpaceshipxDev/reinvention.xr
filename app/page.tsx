// src/app/page.tsx

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import JobRow, { JobMeta } from "@/components/JobRow";
import UploadJob from "@/components/UploadJob";

export const revalidate = 0;   // always fresh

export default async function Home() {
  const q    = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  const jobs: JobMeta[] = snap.docs.map(d => {
    const data = d.data() as any;
    return {
      id:         data.id,
      folder:     data.folder,
      fileCount:  data.fileCount,
      createdAtMs: data.createdAt ? data.createdAt.toMillis() : null,
      meta:       data.meta || "", // ► Get the meta field, with a fallback
    };
  });

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Jobs dashboard</h1>
      <UploadJob />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">Folder</th>
            <th className="py-2 px-4">Metadata</th> {/* ► New table header */}
            <th className="py-2 px-4">Files</th>
            <th className="py-2 px-4">Uploaded</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(j => (
            <JobRow key={j.id} job={j} />
          ))}
        </tbody>
      </table>
    </main>
  );
}