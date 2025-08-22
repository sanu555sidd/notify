import React from 'react';
import { FileText, Shield, Zap, Users, Heart, Search, Languages, Smartphone, Cloud, Bell } from 'lucide-react';

function Features() {
  console.log('Features component is rendering');
  
  const mainFeatures = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Note Taking",
      description: "Create, edit, and organize your notes with a powerful rich text editor. Support for markdown, formatting, and multimedia content.",
      color: "text-blue-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Sentiment Analysis",
      description: "AI-powered sentiment analysis automatically detects the mood and emotion in your notes, helping you track your mental wellness.",
      color: "text-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "End-to-end encryption ensures your personal thoughts and notes remain completely private and secure.",
      color: "text-green-500"
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Translate your notes into multiple languages instantly. Perfect for international collaboration and learning.",
      color: "text-purple-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Sync",
      description: "Real-time synchronization across all your devices. Your notes are always up-to-date, everywhere.",
      color: "text-yellow-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration Ready",
      description: "Share notes and collaborate with team members seamlessly. Perfect for group projects and team workflows.",
      color: "text-indigo-500"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Search className="w-5 h-5" />,
      title: "Powerful Search",
      description: "Find any note instantly with advanced search and filtering capabilities."
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      title: "Cloud Storage",
      description: "Secure cloud backup ensures your notes are never lost."
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Cross-Platform",
      description: "Access your notes on any device - web, mobile, or desktop."
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Smart Reminders",
      description: "Set intelligent reminders and never forget important notes."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover everything that makes Notify the perfect companion for your thoughts, ideas, and creativity.
          </p>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive set of tools designed to enhance your note-taking experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                <div className="text-purple-500 mb-3">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their note-taking experience with Notify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
