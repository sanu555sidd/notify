import { FileText, Shield, Zap, Users, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
  <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Navigation */}
  <nav className="relative z-10 p-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-gray-800 dark:text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Notify</span>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center px-6 pt-12">
  <div className="max-w-4xl text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center space-x-2 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-700 dark:text-gray-200">Trusted by 10k+ users worldwide</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-700 to-pink-700 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent leading-tight">
            Your Digital
            <br />
            <span className="bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Note Sanctuary
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Secure, organize, and access your thoughts from anywhere. Experience note-taking reimagined with cutting-edge encryption and seamless synchronization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate('/signup')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Sign In
            </button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-gray-800 dark:text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Bank-Level Security</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm">End-to-end encryption ensures your notes remain private and secure</p>
            </div>
            
            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-gray-800 dark:text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm">Instant sync across all devices with real-time collaboration</p>
            </div>
            
            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-gray-800 dark:text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Team Ready</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm">Share and collaborate with your team seamlessly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
}

export default Home;