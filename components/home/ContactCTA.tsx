"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-24 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card relative overflow-hidden p-12 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6">Let&apos;s Build Something Amazing</h2>
          <p className="text-gray-300 text-lg mb-10">
            I am currently open to exciting new opportunities, collaborations, and projects.
            Whether you have a question or just want to say hi, my inbox is always open!
          </p>
          
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white text-background font-bold text-lg inline-flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Get In Touch <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
