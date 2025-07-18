"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import usersData from '@/data/users.json';

interface User {
  lastname: string;
  firstname: string;
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Réinitialiser l'erreur quand l'utilisateur tape
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'un délai de connexion
    await new Promise(resolve => setTimeout(resolve, 800));

    // Vérifier les identifiants
    const user = usersData.users.find((u: User) => 
      u.username === formData.username && u.password === formData.password
    );

    if (user) {
      // Stocker le prénom dans localStorage
      localStorage.setItem('userFirstname', user.firstname);
      localStorage.setItem('justLoggedIn', 'true');
      
      // Rediriger vers le dashboard
      router.push('/dashboard');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Messages d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Champs du formulaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-white/80 mb-2">
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Votre nom"
            required
          />
        </div>
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-white/80 mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Votre prénom"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
          Nom d'utilisateur
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          placeholder="Votre nom d'utilisateur"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          placeholder="Votre mot de passe"
          required
        />
      </div>

      {/* Bouton de connexion */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Connexion...</span>
          </div>
        ) : (
          'Se connecter'
        )}
      </motion.button>

      {/* Informations de test */}
      <div className="mt-8 p-4 bg-black/20 backdrop-blur-sm rounded-lg">
        <h4 className="text-white font-semibold mb-2">Comptes de test :</h4>
        <div className="text-sm text-white/80 space-y-1">
          <p>• jean.dupont / password123</p>
          <p>• marie.martin / marie456</p>
          <p>• pierre.durand / pierre789</p>
          <p>• sophie.bernard / sophie321</p>
        </div>
      </div>
    </form>
  );
}