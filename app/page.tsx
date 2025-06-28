// src/app/page.tsx

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { JobMeta } from "@/components/JobRow";
import JobDashboard from "@/components/JobDashboard"; // Import the new component

export const revalidate = 0;   // always fresh

export default async function Home() {
  const q    = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  // Fetch the initial list of jobs on the server
  const initialJobs: JobMeta[] = snap.docs.map(d => {
    const data = d.data() as any;
    return {
      id:         data.id,
      folder:     data.folder,
      fileCount:  data.fileCount,
      createdAtMs: data.createdAt ? data.createdAt.toMillis() : null,
      meta:       data.meta || "",
    };
  });

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Render the client component with the initial data */}
      <JobDashboard initialJobs={initialJobs} />
    </main>
  );
}