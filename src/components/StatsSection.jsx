import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

const stats = [
  {
    id: 1,
    value: 8,
    suffix: "+",
    label: "Années d'Expérience",
    icon: Calendar,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    value: 150,
    suffix: "+",
    label: "Projets Réalisés",
    icon: Briefcase,
    color: "from-amber-500 to-amber-600"
  },
];

const Counter = ({ value, suffix }) => {
  return (
    <span className="flex items-center justify-center">
      {value}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 text-center group"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 transform rotate-3 group-hover:rotate-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-2 font-mono tracking-tight">
                   {stat.value}{stat.suffix}
                </div>
                
                <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
