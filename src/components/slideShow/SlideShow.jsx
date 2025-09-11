import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 'https://i.pinimg.com/736x/d2/d2/5e/d2d25ea37905a3bb3d04e00a5bcff3f8.jpg'
// const slides = [
//   {
//     src: 'https://i.pinimg.com/736x/29/f2/e8/29f2e8b5e59c5c235e4a12d24ca265ff.jpg',
//     caption: 'Caption Text',
//   },
//   {
//     src: 'https://i.pinimg.com/736x/29/f2/e8/29f2e8b5e59c5c235e4a12d24ca265ff.jpg',
//     caption: 'Caption Two',
//   },
//   {
//     src: 'https://i.pinimg.com/736x/29/f2/e8/29f2e8b5e59c5c235e4a12d24ca265ff.jpg',
//     caption: 'Caption Three',
//   },
// ];

const features = [
  {
    src: '/assets/logo.png',
    caption: 'HashHub – A social platform to share your thoughts, build your identity, and stay connected instantly.',
  },
  {
    src: '/assets/thought.png',
    caption: '💬 Engage in Conversations – Post thoughts, share updates, and interact with others instantly.',
  },
  {
    src: '/assets/engage.png',
    caption: '💬 Engage in Conversations – Post thoughts, share updates, and interact with others instantly.',
  },
  {
    src: '/assets/securely.png',
    caption: '📸 Share Media Securely – Upload photos or posts safely with privacy in mind.',
  },
  {
    src: '/assets/profile.png',
    caption: '🙋 Create Your Profile – Showcase your identity, add bio, and personalize your presence.',
  },
];

function SlideShow() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-0">
      <h2 className="text-2xl font-bold mb-4 text-center">Featured</h2>


      <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden aspect-square bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={slideIndex}
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* Image fills the box, keeping 1:1 */}
            <img
              src={features[slideIndex].src}
              alt={`Slide ${slideIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Overlay caption at the very bottom of the box */}
            <div className="absolute bottom-0 left-0 w-full text-center text-white bg-black bg-opacity-50 py-2">
              {features[slideIndex].caption}
            </div>

            {/* Slide counter at top-left */}
            <div className="absolute top-0 left-0 text-white bg-black bg-opacity-50 px-3 py-1 rounded-br">
              {slideIndex + 1} / {features.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>






      <div className="text-center mt-4">
        {features.map((_, index) => (
          <span
            key={index}
            className={`inline-block w-4 h-4 mx-1 rounded-full cursor-pointer transition-colors ${index === slideIndex ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}


export default SlideShow;
