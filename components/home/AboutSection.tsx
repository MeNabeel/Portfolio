"use client";

import { motion } from "framer-motion";
import { User, Code2, Cpu } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 relative">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            I am a Software Engineering student at the University of Central Punjab, 
            driven by the goal of building elegant solutions to complex problems. 
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Currently, I am exploring Artificial Intelligence while expanding my 
            expertise in Cloud Computing and modern full-stack development using the MERN stack.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="glass-card p-4 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-lg text-primary">
                <Code2 size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Frontend</h4>
                <p className="text-sm text-gray-400">Next.js & React</p>
              </div>
            </div>
            <div className="glass-card p-4 flex items-center gap-4">
              <div className="bg-accent/20 p-3 rounded-lg text-accent">
                <Cpu size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Backend</h4>
                <p className="text-sm text-gray-400">Node.js & Supabase</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[2rem] blur-2xl"></div>
            
            {/* Profile Image */}
            <div className="absolute inset-0 glass-card rounded-[2rem] border-2 border-white/10 flex items-center justify-center overflow-hidden z-10">
              <img src="/nabeel_t2.png" alt="Nabeel Ijaz" className="w-full h-full object-cover" />
            </div>
            
            {/* Floating decorative elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass-card p-4 rounded-xl z-20"
            >
              <div className="text-sm font-semibold text-white">Meta Certified</div>
              <div className="text-xs text-accent">Frontend Developer</div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl z-20"
            >
              <div className="text-sm font-semibold text-white">Machine Learning</div>
              <div className="text-xs text-primary">Specialized</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
