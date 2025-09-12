import { motion } from 'framer-motion';

const features = [
  {
    title: 'Hashtag Communities',
    description: 'Discover and join vibrant communities centered around your favorite topics and hashtags.',
    icon: '🔗',
  },
  {
    title: 'Secure Sharing',
    description: 'Share posts, images, and messages with end-to-end encryption for total privacy.',
    icon: '🔒',
  },
  {
    title: 'Real-Time Engagement',
    description: 'Connect instantly with likes, comments, and shares in a dynamic, secure environment.',
    icon: '⚡️',
  },
  {
    title: 'Personalized Feeds',
    description: 'Curate your feed with trending hashtags and content tailored to your interests.',
    icon: '📱',
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-[linear-gradient(to_right_top,#000000,#08080c,#0a1214)] w-full py-16 relative overflow-hidden">
      {/* Radial glow overlay for consistency */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }}
          viewport={{ amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 font-[Inter,sans-serif] tracking-tight mb-12">
            Unleash Your Social Experience
          </h2>
        </motion.div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-2xl shadow-gray-900/50 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99], delay: index * 0.2 }}
              viewport={{ amount: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4 text-teal-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3 font-[Inter,sans-serif] tracking-tight">
                {feature.title}
              </h3>
              <p className="text-base text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;