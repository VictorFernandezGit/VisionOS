"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ResultsPage() {
  const { jobId } = useParams();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchResult = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/results/" + jobId);
        if (!res.ok) throw new Error("Not ready");
        const data = await res.json();
        setResult(data);
        setLoading(false);
        if (data.status !== "completed") {
          interval = setTimeout(fetchResult, 2000);
        }
      } catch (e) {
        interval = setTimeout(fetchResult, 2000);
      }
    };
    fetchResult();
    return () => clearTimeout(interval);
  }, [jobId]);

  if (loading) return <div className="text-gray-200 text-center mt-20">Loading simulation results...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!result) return <div className="text-gray-200">No result found.</div>;

  const kpiData = Object.entries(result.metrics || {}).map(([k, v]) => ({ name: k, value: v }));

  return (
    <div className="max-w-3xl mx-auto bg-[#181A20] p-10 rounded-2xl shadow-xl flex flex-col gap-8 border border-gray-800 mt-8">
      <h1 className="text-3xl font-extrabold mb-2 text-white tracking-tight">Simulation Results</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.name} className="bg-[#23262F] rounded-xl shadow p-6 flex flex-col items-center border border-gray-700">
            <div className="text-xs font-semibold text-gray-400 mb-1 tracking-widest">{kpi.name.toUpperCase()}</div>
            <div className="text-2xl font-bold text-white">{typeof kpi.value === "number" ? kpi.value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#23262F] rounded-xl shadow p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">KPI Breakdown</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={kpiData}>
              <XAxis dataKey="name" stroke="#aaa" tick={{ fill: '#aaa' }} />
              <YAxis stroke="#aaa" tick={{ fill: '#aaa' }} />
              <Tooltip contentStyle={{ background: '#23262F', border: '1px solid #444', color: '#fff' }} />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 border-l-4 border-blue-500 p-6 rounded-xl mt-4 shadow">
        <div className="font-semibold text-white mb-1 text-lg">AI Insight</div>
        <div className="text-gray-100">{result.insight}</div>
      </div>
    </div>
  );
} 