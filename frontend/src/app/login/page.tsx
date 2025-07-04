"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push("/");
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
    if (error) setError(error.message);
    // On success, Supabase will redirect automatically
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#181A20]">
      <form
        onSubmit={handleLogin}
        className="bg-[#23262F] p-10 rounded-2xl shadow-xl flex flex-col gap-6 w-full max-w-md border border-gray-800"
      >
        <h1 className="text-3xl font-extrabold text-white text-center">Sign In</h1>
        <button
          type="button"
          onClick={handleGoogle}
          className="bg-white text-gray-900 font-semibold py-2 rounded-lg shadow flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-1.9 14.6-5.1l-6.7-5.5C29.7 35.1 27 36 24 36c-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.1 41.1 14.9 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.3-4z"/></g></svg>
          Sign in with Google
        </button>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input text-gray-900 border-gray-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input text-gray-900 border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition-colors"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
      </form>
    </div>
  );
} 