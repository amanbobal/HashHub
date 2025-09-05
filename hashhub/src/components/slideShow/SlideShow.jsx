import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    src: 'https://i.pinimg.com/736x/d2/d2/5e/d2d25ea37905a3bb3d04e00a5bcff3f8.jpg',
    caption: 'Caption Text',
  },
  {
    src: 'https://i.pinimg.com/736x/29/f2/e8/29f2e8b5e59c5c235e4a12d24ca265ff.jpg',
    caption: 'Caption Two',
  },
  {
    src: 'https://i.pinimg.com/736x/d2/d2/5e/d2d25ea37905a3bb3d04e00a5bcff3f8.jpg',
    caption: 'Caption Three',
  },
];
function SlideShow() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-0">
      <h2 className="text-2xl font-bold mb-4 text-center">Automatic Slideshow</h2>
      <p className="mb-4 text-center">Change image every 2 seconds:</p>
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden h-96">
        <AnimatePresence initial={false}>
          <motion.div
            key={slideIndex}
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={slides[slideIndex].src}
              alt={`Slide ${slideIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full text-center text-white bg-black bg-opacity-50 py-2">
              {slides[slideIndex].caption}
            </div>
            <div className="absolute top-0 left-0 text-white bg-black bg-opacity-50 px-3 py-1 rounded-br">
              {slideIndex + 1} / {slides.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-center mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`inline-block w-4 h-4 mx-1 rounded-full cursor-pointer transition-colors ${
              index === slideIndex ? 'bg-gray-600' : 'bg-gray-300'
            }`}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}


export default SlideShow;
