import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is HashHub?',
    answer:
      'HashHub is a next-generation social media platform that lets you connect with communities through hashtags, share securely with end-to-end encryption, and explore trending topics tailored to your interests.',
  },
  {
    question: 'How does HashHub protect my privacy?',
    answer:
      'We prioritize your privacy with advanced end-to-end encryption for all posts, messages, and images. You control your data, deciding what to share and with whom, and we never sell your information.',
  },
  {
    question: 'Can I join multiple hashtag communities?',
    answer:
      'Yes! HashHub allows you to join and participate in as many hashtag-based communities as you like, making it easy to connect with like-minded people across diverse topics.',
  },
  {
    question: 'Is HashHub free to use?',
    answer:
      'HashHub offers a free tier with core features like community engagement and secure sharing. Premium features may be available through a subscription, unlocking enhanced tools for personalization and analytics.',
  },
  {
    question: 'How do I get started with HashHub?',
    answer:
      'Simply sign up with your email, create a profile, and start exploring hashtag communities. You can customize your feed and connect with others in just a few clicks!',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[linear-gradient(to_right_top,#000000,#08080c,#0a1214)] w-full py-16 relative overflow-hidden">
      {/* Radial glow overlay */}
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
            Frequently Asked Questions
          </h2>
        </motion.div>
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl shadow-gray-900/50 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99], delay: index * 0.2 }}
              viewport={{ amount: 0.3 }}
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg sm:text-xl font-semibold text-white font-[Inter,sans-serif] tracking-tight">
                  {faq.question}
                </span>
                <span className="text-teal-400">
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className="px-6 pb-4"
                  >
                    <p className="text-base text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;