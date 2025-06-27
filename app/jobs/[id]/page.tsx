"use client";                    // needs Firebase client SDK
import { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default function JobFilesPage({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    (async () => {
      const storage  = getStorage();
      const folderRef = ref(storage, `jobs/${jobId}`);
      const res = await listAll(folderRef);
      const list = await Promise.all(
        res.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item),
        }))
      );
      setFiles(list);
    })();
  }, [jobId]);

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Files in Job {jobId}</h2>

      {files.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((f) => (
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
    </main>
  );
}