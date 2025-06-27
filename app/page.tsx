'use client';
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import JobRow, { JobMeta } from "@/components/JobRow";
import UploadJob from "@/components/UploadJob";

export default function Home() {
  const [jobs, setJobs] = useState<JobMeta[]>([]);
  const [selected, setSelected] = useState<JobMeta | null>(null);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setJobs(snap.docs.map(d => d.data() as JobMeta));
    })();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Jobs dashboard</h1>
      <UploadJob />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">Folder</th>
            <th className="py-2 px-4">Files</th>
            <th className="py-2 px-4">Uploaded</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(j => (
            <JobRow key={j.id} job={j} onView={() => setSelected(j)} />
          ))}
        </tbody>
      </table>
      {selected && <JobFiles job={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

// --- Inline modal: JobFiles ---
import { storage } from "./firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
function JobFiles({ job, onClose }: { job: JobMeta, onClose: () => void }) {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  useEffect(() => {
    (async () => {
      const dirRef = ref(storage, `jobs/${job.id}`);
      const list = await listAll(dirRef);
      setFiles(await Promise.all(
        list.items.map(async i => ({ name: i.name, url: await getDownloadURL(i) }))
      ));
    })();
  }, [job]);
  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4 relative">
        <button className="absolute top-2 right-4 text-lg" onClick={onClose}>×</button>
        <h2 className="text-xl font-medium mb-2">{job.folder} Files</h2>
        <ul className="space-y-2">
          {files.length === 0 && <li className="text-gray-400">No files yet</li>}
          {files.map(f => (
            <li key={f.name} className="truncate">
              <a href={f.url} target="_blank" rel="noopener" className="text-blue-700 underline">{f.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}