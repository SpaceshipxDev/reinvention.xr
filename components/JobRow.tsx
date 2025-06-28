// components/JobRow.tsx

"use client";
import { useRouter } from "next/navigation";

export interface JobMeta {
  id: string;
  folder: string;
  fileCount: number;
  createdAtMs: number | null;
  meta?: string; // ► Add the optional meta field
}

export default function JobRow({ job }: { job: JobMeta }) {
  const router = useRouter();
  
  // ► Truncate meta for display in the table
  const metaPreview = job.meta
    ? job.meta.length > 60
      ? `${job.meta.substring(0, 60)}...`
      : job.meta
    : "–";

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer border-b"
      onClick={() => router.push(`/jobs/${job.id}`)}
    >
      <td className="py-2 px-4 font-mono">{job.folder}</td>
      {/* ► New cell for the metadata preview */}
      <td className="py-2 px-4 text-sm text-gray-600 max-w-xs truncate" title={job.meta}>
        {metaPreview}
      </td>
      <td className="py-2 px-4">{job.fileCount}</td>
      <td className="py-2 px-4 text-sm text-gray-500">
        {job.createdAtMs ? new Date(job.createdAtMs).toLocaleString() : "–"}
      </td>
      <td className="py-2 px-4 text-right">
        <button className="text-blue-600 underline">View</button>
      </td>
    </tr>
  );
}