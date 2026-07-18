"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Github, Linkedin } from "../components/icons";
import { AboutSection } from "../components/home/AboutSection";
import { EducationSection } from "../components/home/EducationSection";
import { SkillsSection } from "../components/home/SkillsSection";
import { ProjectsPreview } from "../components/home/ProjectsPreview";
import { ContactCTA } from "../components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-12 max-w-4xl w-full relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          Final Year Software Engineering Student
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Hi, I&apos;m <span className="text-gradient">Nabeel Ijaz</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          A passionate Software Engineer specializing in Full Stack MERN Development, 
          Artificial Intelligence, and creating scalable modern web applications.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              View Projects <ArrowRight size={18} />
            </motion.button>
          </Link>
          
          <Link href="/download/resume">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-all"
            >
              <Download size={18} /> Download Resume
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-all"
            >
              Contact Me
            </motion.button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex justify-center gap-6">
          <Link href="https://github.com/MeNabeel" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            <Github size={24} />
          </Link>
          <Link href="https://linkedin.com/in/nabeelijaz-developer" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </Link>
          <Link href="mailto:nabeelijaz559@gmail.com" className="text-gray-400 hover:text-white transition-colors">
            <Mail size={24} />
          </Link>
        </div>
      </motion.div>
      </div>

      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsPreview />
      <ContactCTA />
    </>
  );
}
