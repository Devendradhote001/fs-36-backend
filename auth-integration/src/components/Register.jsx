import React, { useState } from "react";
import { api } from "../config/api";
import { useNavigate } from "react-router";

const Register = ({ setToggle }) => {
  let navigate = useNavigate();
  let formData = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await api.post("/api/auth/register", formData);
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.log("error in register", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-black/30 sm:p-10">
        {/* Header */}{" "}
        <div className="mb-8 text-center">
          {" "}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-2xl font-bold text-white shadow-lg shadow-indigo-500/30">
            R{" "}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Join us by creating your new account.
          </p>
        </div>
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Full Name
            </label>
            <input
              id="name"
              onChange={(e) => (formData.name = e.target.value)}
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>
            <input
              onChange={(e) => (formData.email = e.target.value)}
              id="register-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              onChange={(e) => (formData.password = e.target.value)}
              id="register-password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>
        {/* Switch to Login */}
        <div className="mt-7 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
