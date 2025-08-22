import React from 'react';
import { 
  FileText, 
  Heart, 
  Shield, 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  Globe,
  Mail,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

function About() {
  const teamMembers = [
    {
      name: "Rohit Kumar",
      role: "Full Stack Developer & Founder",
      image: "/api/placeholder/150/150",
      description: "Passionate about creating intuitive digital experiences and mental wellness technology.",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Siddharth Raj",
      role: "UI/UX Designer",
      image: "/api/placeholder/150/150",
      description: "Focused on creating beautiful, user-centered designs that make technology accessible.",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Utkarsh Rajput",
      role: "AI/ML Engineer",
      image: "/api/placeholder/150/150",
      description: "Specializing in sentiment analysis and natural language processing for better user insights.",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Project Inception",
      description: "Started developing Notify as a college project with a vision to revolutionize note-taking."
    },
    {
      year: "2025",
      title: "AI Integration",
      description: "Successfully integrated sentiment analysis to help users track their mental wellness through notes."
    },
    {
      year: "2025",
      title: "Beta Launch",
      description: "Launched beta version with core features and received positive feedback from early users."
    },
    {
      year: "Future",
      title: "Global Expansion",
      description: "Planning to expand internationally with multi-language support and enterprise features."
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your thoughts are personal. We use end-to-end encryption to ensure your notes remain completely private and secure."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mental Wellness",
      description: "We believe technology should support mental health. Our sentiment analysis helps you understand your emotional patterns."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by students, for students and professionals. We listen to our community and continuously improve based on feedback."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessibility",
      description: "Technology should be available to everyone. We're committed to making Notify accessible across all devices and languages."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Notify
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Empowering minds through intelligent note-taking. We're on a mission to make your thoughts more organized, 
            secure, and insightful.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                At Notify, we believe that everyone deserves a safe space for their thoughts. Our mission is to create 
                the most intuitive, secure, and intelligent note-taking platform that not only organizes your ideas 
                but also provides insights into your mental and emotional well-being.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We're building more than just a note-taking app – we're creating a digital sanctuary where your 
                thoughts can flourish, your creativity can thrive, and your mental wellness is supported by 
                cutting-edge AI technology.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To become the world's leading platform for intelligent note-taking, where technology seamlessly 
                integrates with human creativity to unlock new levels of productivity, self-awareness, and 
                personal growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do and shape the future of Notify.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-purple-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey/Timeline Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From a college project to a revolutionary note-taking platform.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-purple-200 dark:bg-purple-800"></div>
            
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate individuals working together to revolutionize how you interact with your thoughts and ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Users className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.description}
                </p>
                <div className="flex justify-center space-x-3">
                  <a href={member.social.github} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Mail className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Contact Us
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-300">
              Join Our Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
