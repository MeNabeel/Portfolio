"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { login, signup } from "./actions";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const authSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
}).superRefine((data, ctx) => {
  // We only validate names during signup (handled in the component logic below, but strictly z.string() is fine)
});

type AuthFormValues = z.infer<typeof authSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    setIsPending(true);
    setError(null);
    
    const formData = new FormData();
    if (!isLogin) {
      if (!data.firstName) return setError("First Name is required for Sign Up");
      if (!data.lastName) return setError("Last Name is required for Sign Up");
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
    }
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = isLogin ? await login(formData) : await signup(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p className="text-gray-400">
            {isLogin ? "Please sign in to continue." : "Sign up to contact me or view details."}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-white/5 rounded-lg mb-8">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isLogin ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isLogin ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="John"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  disabled={isPending}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  disabled={isPending}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              disabled={isPending}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              disabled={isPending}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                {isLogin ? "Signing in..." : "Signing up..."}
              </>
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
