import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Alex M.', quote: 'HashHub’s privacy features let me share confidently without worrying about my data.' },
  { name: 'Sarah K.', quote: 'I love how easy it is to connect with communities around my interests!' },
  { name: 'James T.', quote: 'The best platform for secure, hashtag-driven social networking.' },
];

const TestimonialsSection = () => {
  return (
    <div className="bg-[linear-gradient(to_right_top,#000000,#08080c,#0a1214)] w-full py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }}
          viewport={{ amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 font-[Inter,sans-serif] tracking-tight mb-12">
            What Our Users Say
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-2xl shadow-gray-900/50 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99], delay: index * 0.2 }}
              viewport={{ amount: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-base text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-sm font-semibold text-white">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;