"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SimulatePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.job_id) {
      router.push(`/results/${json.job_id}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Run a Simulation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="text-gray-900">
          Traffic
          <input type="number" {...register("traffic", { required: true })} className="input text-gray-900 border-gray-300" />
          <span className="text-xs text-gray-400">Monthly website visitors (e.g., 10000)</span>
          {errors.traffic && <span className="text-red-500">Required</span>}
        </label>
        <label className="text-gray-900">
          CPC ($)
          <input type="number" step="0.01" {...register("cpc", { required: true })} className="input text-gray-900 border-gray-300" />
          <span className="text-xs text-gray-400">Cost per click for ads (e.g., 1.50)</span>
          {errors.cpc && <span className="text-red-500">Required</span>}
        </label>
        <label className="text-gray-900">
          Conversion Rate (%)
          <input type="number" step="0.01" {...register("conversion_rate", { required: true })} className="input text-gray-900 border-gray-300" />
          <span className="text-xs text-gray-400">Percent of visitors who become customers (e.g., 2.5)</span>
          {errors.conversion_rate && <span className="text-red-500">Required</span>}
        </label>
        <label className="text-gray-900">
          Price ($)
          <input type="number" step="0.01" {...register("price", { required: true })} className="input text-gray-900 border-gray-300" />
          <span className="text-xs text-gray-400">Average revenue per customer (e.g., 49.99)</span>
          {errors.price && <span className="text-red-500">Required</span>}
        </label>
        <label className="text-gray-900">
          Churn (%)
          <input type="number" step="0.01" {...register("churn", { required: true })} className="input text-gray-900 border-gray-300" />
          <span className="text-xs text-gray-400">Percent of customers lost per month (e.g., 5)</span>
          {errors.churn && <span className="text-red-500">Required</span>}
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded font-semibold mt-4">Simulate</button>
      </form>
    </div>
  );
} 