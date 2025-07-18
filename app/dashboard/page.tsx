"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import WelcomeBanner from '@/components/WelcomeBanner';
import GoodbyeCard from '@/components/GoodbyeCard';

export default function DashboardPage() {
  const router = useRouter();
  const [firstname, setFirstname] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const storedFirstname = localStorage.getItem('userFirstname');
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    
    if (!storedFirstname) {
      router.push('/login');
      return;
    }
    
    setFirstname(storedFirstname);
    
    // Afficher le message de bienvenue si l'utilisateur vient de se connecter
    if (justLoggedIn === 'true') {
      setShowWelcome(true);
      localStorage.removeItem('justLoggedIn');
      
      // Masquer le message de bienvenue après 4 secondes
      setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
    }
  }, [router]);

  const handleLogout = () => {
    setShowGoodbye(true);
    
    // Rediriger après 3 secondes
    setTimeout(() => {
      localStorage.removeItem('userFirstname');
      router.push('/login');
    }, 3000);
  };

  if (!firstname) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar firstname={firstname} onLogout={handleLogout} />
      
      {/* Messages animés */}
      {showWelcome && <WelcomeBanner firstname={firstname} />}
      {showGoodbye && <GoodbyeCard firstname={firstname} />}
      
      {/* Contenu principal du dashboard */}
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Bienvenue dans votre espace personnel, {firstname}
            </p>
          </motion.div>

          {/* Grille de cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Statistiques */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Statistiques</h3>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Connexions</span>
                  <span className="font-semibold text-gray-900">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activité</span>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
              </div>
            </motion.div>

            {/* Card Profil */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Profil</h3>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nom</span>
                  <span className="font-semibold text-gray-900">{firstname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut</span>
                  <span className="font-semibold text-blue-600">Connecté</span>
                </div>
              </div>
            </motion.div>

            {/* Card Notifications */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19h16a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nouvelles</span>
                  <span className="font-semibold text-red-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lues</span>
                  <span className="font-semibold text-gray-900">15</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section activité récente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Activité récente</h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                {[
                  { action: "Connexion réussie", time: "Il y a 2 minutes", color: "green" },
                  { action: "Mise à jour du profil", time: "Il y a 1 heure", color: "blue" },
                  { action: "Notification lue", time: "Il y a 3 heures", color: "yellow" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}