"use client";

import { motion } from "framer-motion";
import { Layout, Server, Code, Sparkles, Cloud, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="w-6 h-6 text-primary" />,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Shadcn UI", "Framer Motion", "Responsive Design", "REST API"],
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6 text-accent" />,
    skills: ["Node.js", "Express.js", "MongoDB", "Supabase", "JWT", "REST API", "Resend"],
  },
  {
    title: "Languages",
    icon: <Code className="w-6 h-6 text-purple-400" />,
    skills: ["JavaScript", "TypeScript", "C++", "Python"],
  },
  {
    title: "AI",
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
    skills: ["Prompt Engineering", "OpenAI APIs", "Image Generation APIs", "AI Integrations"],
  },
  {
    title: "Cloud",
    icon: <Cloud className="w-6 h-6 text-blue-300" />,
    skills: ["Cloud Computing Fundamentals", "Vercel", "Supabase"],
  },
  {
    title: "Tools",
    icon: <Wrench className="w-6 h-6 text-green-400" />,
    skills: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Figma", "Cursor", "Antigravity IDE", "Railway", "MongoDB Atlas"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SkillsSection() {
  return (
    <section className="py-24 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          My <span className="text-gradient">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={category.title} 
            variants={cardVariants}
            className="glass-card p-6 group hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:border-white/30 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
