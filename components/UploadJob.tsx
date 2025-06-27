export interface JobMeta {
  id: string;
  folder: string;
  createdAt: any; // Timestamp or null
  fileCount: number;
}
export default function JobRow({ job, onView }: { job: JobMeta; onView: () => void }) {
  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={onView}>
      <td className="py-2 px-4 font-mono">{job.folder}</td>
      <td className="py-2 px-4">{job.fileCount}</td>
      <td className="py-2 px-4 text-sm text-gray-500">
        {job.createdAt?.toDate?.().toLocaleString?.() ?? "–"}
      </td>
      <td className="py-2 px-4 text-right">
        <button className="text-blue-600 underline">View</button>
      </td>
    </tr>
  );
}