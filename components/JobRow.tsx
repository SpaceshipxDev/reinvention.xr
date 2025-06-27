"use client";
import { useRouter } from "next/navigation";

export interface JobMeta {
  id: string;
  folder: string;
  fileCount: number;
  createdAtMs: number | null;   // ★ plain millis
}

export default function JobRow({ job }: { job: JobMeta }) {
  const router = useRouter();
  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => router.push(`/jobs/${job.id}`)}
    >
      <td className="py-2 px-4 font-mono">{job.folder}</td>
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