"use client";

import { motion } from 'framer-motion';

interface WelcomeBannerProps {
  firstname: string;
}

export default function WelcomeBanner({ firstname }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <div>
            <h3 className="text-lg font-bold">Bienvenue, {firstname}!</h3>
            <p className="text-sm opacity-90">Connexion réussie</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}