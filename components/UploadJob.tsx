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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setBusy(true);

    const files   = Array.from(e.target.files);
    const relRoot = files[0].webkitRelativePath.split("/")[0] || "job";
    const jobId   = uuidv4();

    // 1) Meta → Firestore
    await setDoc(doc(collection(db, "jobs"), jobId), {
      id: jobId,
      folder: relRoot,
      createdAt: serverTimestamp(),
      fileCount: files.length,
    });

    // 2) Files → Storage
    await Promise.all(
      files.map(f =>
        uploadBytes(sRef(storage, `jobs/${jobId}/${f.webkitRelativePath}`), f)
      )
    );

    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="border p-4 rounded-xl shadow-sm">
      <input
        ref={inputRef}
        type="file"
        multiple
        /* React doesn’t understand this prop, so cast to any */
        {...({ webkitdirectory: "true" } as any)}
        className="hidden"
        onChange={handleUpload}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
        disabled={busy}
      >
        {busy ? "Uploading…" : "Upload Folder"}
      </button>
    </div>
  );
}