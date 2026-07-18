"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitContact } from "@/actions/contact";
import { Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    const result = await submitContact(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }
    
    setIsPending(false);
  };

  return (
    <div className="glass-card p-8 rounded-2xl w-full max-w-2xl mx-auto border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Send a Message</h2>
        <p className="text-gray-400">Fill out the form below and I'll get back to you soon.</p>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-center">
          Message sent successfully! Thank you for reaching out.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              disabled={isPending}
            />
            {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Your Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              disabled={isPending}
            />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
          <input
            {...register("subject")}
            type="text"
            placeholder="Project Inquiry"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            disabled={isPending}
          />
          {errors.subject && <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Tell me about your project..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
            disabled={isPending}
          ></textarea>
          {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
