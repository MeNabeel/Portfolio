"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export function EducationSection() {
  return (
    <section className="py-24 relative">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Education Timeline */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-primary/20 p-3 rounded-xl border border-primary/30">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Education</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {/* Degree */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/80 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 border border-primary/20">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h3 className="font-bold text-white text-lg">BS Software Engineering</h3>
                  <span className="text-sm text-accent font-medium mt-1 sm:mt-0">2022 - 2027</span>
                </div>
                <div className="text-gray-300 font-medium mb-1">University of Central Punjab</div>
                <div className="text-sm text-gray-400">Lahore, Pakistan</div>
              </div>
            </motion.div>

            {/* ICS */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-white/20 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h3 className="font-bold text-white text-lg">ICS</h3>
                </div>
                <div className="text-gray-300 font-medium mb-1">Punjab Group of Colleges</div>
                <div className="text-sm text-gray-400">Lahore, Pakistan</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-accent/20 p-3 rounded-xl border border-accent/30">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-white/20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">Meta Frontend Specialization</h3>
                <p className="text-sm text-gray-400 mt-4 flex items-center gap-1 group-hover:text-white transition-colors">
                  View Certificate <span className="text-primary ml-1">→</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-white/20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">GitHub Certification</h3>
                <p className="text-sm text-gray-400 mt-4 flex items-center gap-1 group-hover:text-white transition-colors">
                  View Certificate <span className="text-accent ml-1">→</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
