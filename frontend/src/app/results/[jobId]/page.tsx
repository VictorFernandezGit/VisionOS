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

  if (loading) return <div>Loading simulation results...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!result) return <div>No result found.</div>;

  const kpiData = Object.entries(result.metrics || {}).map(([k, v]) => ({ name: k, value: v }));

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Simulation Results</h1>
      <div className="grid grid-cols-2 gap-4">
        {kpiData.map((kpi) => (
          <div key={kpi.name} className="bg-gray-100 rounded p-4 text-center">
            <div className="text-lg font-semibold">{kpi.name.toUpperCase()}</div>
            <div className="text-2xl font-bold">{kpi.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
        ))}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={kpiData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
        <div className="font-semibold mb-1">AI Insight</div>
        <div>{result.insight}</div>
      </div>
    </div>
  );
} 