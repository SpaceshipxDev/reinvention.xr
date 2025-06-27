import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function JobFilesPage({ params }: { params: { id: string } }) {
  const jobId = params.id;

  // Fetch job meta (optional, for folder name etc.)
  const jobDoc = await getDoc(doc(db, "jobs", jobId));
  const jobData = jobDoc.exists() ? jobDoc.data() : null;

  // List files in Firebase Storage (SSR note: could move to client for credentials)
  const storage = getStorage();
  const folderRef = ref(storage, `jobs/${jobId}`);
  const res = await listAll(folderRef);

  // Get download URLs for each file
  const fileList = await Promise.all(
    res.items.map(async (item) => ({
      name: item.name,
      url: await getDownloadURL(item)
    }))
  );

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Files in: {jobData?.folder ?? jobId}</h2>
      <ul className="space-y-2">
        {fileList.map((file) => (
          <li key={file.name} className="flex justify-between items-center border-b py-2">
            <span className="font-mono">{file.name}</span>
            <a href={file.url} target="_blank" rel="noopener noreferrer"
               className="text-blue-600 underline"
               download={file.name}>
              Download
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
