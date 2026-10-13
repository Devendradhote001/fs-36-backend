import React from "react";
import { useNavigate } from "react-router";
import { api } from "../config/api";
import { useContextData } from "../context/AuthContext";

const Login = ({}) => {
  let { setIsLoggedInUser } = useContextData();

  let navigate = useNavigate();

  let formData = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("he");

    try {
      let res = await api.post("/api/auth/login", formData);
      console.log(res);
      navigate("/home");
      if (res) {
        setIsLoggedInUser(res.data.data);
      }
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-black/30 sm:p-10">
        {/* Header */}{" "}
        <div className="mb-8 text-center">
          {" "}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-2xl font-bold text-white shadow-lg shadow-indigo-500/30">
            L{" "}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter your details to sign in to your account.
          </p>
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>
            <input
              onChange={(e) => (formData.email = e.target.value)}
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              onChange={(e) => (formData.password = e.target.value)}
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
        {/* Switch to Register */}
        <div className="mt-7 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
