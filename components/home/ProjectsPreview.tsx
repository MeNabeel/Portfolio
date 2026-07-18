"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "../icons";

const featuredProjects = [
  {
    title: "ATS Friendly Resume Builder",
    description: "A full-stack MERN application that allows users to create ATS-friendly resumes using professional templates with PDF export functionality.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    status: "Completed",
    github: "https://github.com/MeNabeel/my-portfolio",
    live: "https://example.com",
    image: "/ats1.jpeg"
  },
  {
    title: "Toolkit by Nabeel",
    description: "A comprehensive Chrome extension enhancing the UCP student portal experience with intelligent features, Grade Prediction, and automation tools.",
    stack: ["HTML", "CSS", "JavaScript", "Chrome API"],
    status: "Completed",
    github: "https://github.com/nabeelijaz/toolkit",
    live: "https://chrome.google.com/webstore/detail/toolkit",
    image: "/t1.png"
  },
  {
    title: "PetLink",
    description: "A comprehensive pet management platform featuring a marketplace, temporary shelter system, health records, and AI-powered adoption matching.",
    stack: ["Next.js", "Supabase", "Redis", "AI"],
    status: "In Progress",
    github: "https://github.com",
    live: "https://example.com",
    image: null
  },
];

export function ProjectsPreview() {
  return (
    <section className="py-24 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
        </div>
        <Link href="/projects" className="hidden md:flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium">
          View All Projects <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((project, idx) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card group overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative flex items-center justify-center border-b border-white/10 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <span className="text-white/30 font-semibold text-lg tracking-widest uppercase">Project Image</span>
              )}
              
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-white z-10">
                {project.status}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-6 flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map(tech => (
                  <span key={tech} className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <Link href={project.github} target="_blank" className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors">
                  <Github size={16} /> Source Code
                </Link>
                <Link href={project.live} target="_blank" className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors">
                  <ExternalLink size={16} /> Live Demo
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium">
          View All Projects <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
