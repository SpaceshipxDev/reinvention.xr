// components/UploadJob.tsx

"use client";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref as sRef, uploadBytes } from "firebase/storage";
import {
  collection, doc, serverTimestamp, setDoc,
} from "firebase/firestore";
import { storage, db } from "@/lib/firebase";

export default function UploadJob() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  
  // ► New state to hold selected files and metadata
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [meta, setMeta] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      setSelectedFiles(null);
      return;
    }
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!selectedFiles?.length) return;
    setBusy(true);

    const files   = selectedFiles;
    const relRoot = files[0].webkitRelativePath.split("/")[0] || "job";
    const jobId   = uuidv4();

    // 1) Meta → Firestore (now includes the 'meta' field)
    await setDoc(doc(collection(db, "jobs"), jobId), {
      id: jobId,
      folder: relRoot,
      createdAt: serverTimestamp(),
      fileCount: files.length,
      meta: meta, // ► Add the metadata string here
    });

    // 2) Files → Storage
    await Promise.all(
      files.map(f =>
        uploadBytes(sRef(storage, `jobs/${jobId}/${f.webkitRelativePath}`), f)
      )
    );

    // ► Reset the form state
    setBusy(false);
    setMeta("");
    setSelectedFiles(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  
  const folderName = selectedFiles?.[0]?.webkitRelativePath.split("/")[0];

  return (
    <div className="border p-4 rounded-xl shadow-sm space-y-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        {...({ webkitdirectory: "true" } as any)}
        className="hidden"
        onChange={handleFileSelect} // ► This now just sets state
      />

      {/* Step 1: Select Folder */}
      {!selectedFiles && (
        <button
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Select Folder to Upload
        </button>
      )}

      {/* Step 2: Add Metadata & Submit */}
      {selectedFiles && (
        <div className="space-y-3">
          <p className="font-medium">
            Selected folder: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{folderName}</span> ({selectedFiles.length} files)
          </p>

          <div>
            <label htmlFor="meta" className="block text-sm font-medium text-gray-700 mb-1">
              Job Metadata (Customer Info, Notes, etc.)
            </label>
            <textarea
              id="meta"
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm p-2"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              placeholder="e.g. Customer: Acme Corp, Project: Q3 Marketing, Contact: john.doe@acme.com"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
              disabled={busy || !meta.trim()} // ► Disable if busy or meta is empty
            >
              {busy ? "Uploading…" : "Submit Job"}
            </button>
            <button
              onClick={() => {
                setSelectedFiles(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="text-sm text-gray-600 hover:underline"
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}