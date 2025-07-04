import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-[#181A20] rounded-2xl shadow-xl p-10 w-full max-w-2xl border border-gray-800 flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight text-center">Welcome to VisionOS</h1>
        <p className="text-lg text-gray-300 text-center max-w-xl">
          VisionOS is your AI-powered business simulation platform. Model your growth, test strategies, and get instant AI insights.
        </p>
        <div className="grid grid-cols-2 gap-6 w-full mt-6">
          <div className="bg-[#23262F] rounded-xl p-6 flex flex-col items-center border border-gray-700">
            <div className="text-xs font-semibold text-gray-400 mb-1 tracking-widest">SIMULATIONS</div>
            <div className="text-2xl font-bold text-white">--</div>
          </div>
          <div className="bg-[#23262F] rounded-xl p-6 flex flex-col items-center border border-gray-700">
            <div className="text-xs font-semibold text-gray-400 mb-1 tracking-widest">LAST RUN</div>
            <div className="text-2xl font-bold text-white">--</div>
          </div>
        </div>
        <a
          href="/simulate"
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors text-lg"
        >
          Run a Simulation
        </a>
      </div>
    </div>
  );
}
