// components/JobDashboard.tsx

"use client";

import { useState } from "react";
import JobRow, { JobMeta } from "./JobRow";
import UploadJob from "./UploadJob";

export default function JobDashboard({ initialJobs }: { initialJobs: JobMeta[] }) {
  const [jobs, setJobs] = useState<JobMeta[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search is cleared, reset to initial list
      setJobs(initialJobs);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const relevantJobs = await response.json();
      setJobs(relevantJobs);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      alert("An error occurred during search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setJobs(initialJobs);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Jobs dashboard</h1>
      <UploadJob />

      {/* --- AI Search Section --- */}
      <div className="p-4 border rounded-xl shadow-sm bg-white">
        <h3 className="font-semibold text-lg mb-2">AI-Powered Search</h3>
        <p className="text-sm text-gray-600 mb-3">
          Ask a question about a customer, project, or date to find jobs.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="e.g., find Acme's marketing job from last quarter"
            className="flex-grow border-gray-300 rounded-md shadow-sm p-2"
            disabled={isSearching}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
          <button
            onClick={clearSearch}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
            disabled={isSearching}
          >
            Clear
          </button>
        </div>
      </div>
      
      {/* --- Jobs Table Section --- */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">Folder</th>
            <th className="py-2 px-4">Metadata</th>
            <th className="py-2 px-4">Files</th>
            <th className="py-2 px-4">Uploaded</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map(j => <JobRow key={j.id} job={j} />)
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                {isSearching ? '...' : 'No jobs found.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}