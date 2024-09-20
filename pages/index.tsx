import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import Header from '../components/Header';

// Testimonials and Comments Data
const testimonials = [
  { text: "PlateChat helped me report reckless drivers without risking my privacy. Amazing platform!", author: "@safetyfirst" },
  { text: "Love how I can also give shoutouts to courteous drivers. It's not just about reporting bad behavior.", author: "@courteousdriver" },
  { text: "This app has made our community roads so much safer. Thank you, PlateChat!", author: "@safetyadvocate" },
];

const exampleComments = [
  { plate: "7HSH299", comment: "This driver helped me out during a flat tire. Thanks so much!", author: "@carlover" },
  { plate: "NYC3035", comment: "This car sped through a red light, be careful!", author: "@safedriver" },
  { plate: "TX45K2", comment: "Stopped to let pedestrians cross. Great job!", author: "@friendlydriver" },
  { plate: "LA3998", comment: "Dangerous lane switching on the highway. Watch out!", author: "@watchful" },
];

export default function Home() {
  const [plateNumber, setPlateNumber] = useState('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (plateNumber.trim()) {
      router.push(`/plates/${plateNumber.trim().toUpperCase()}`);
    }
  };

  // Infinite scroll logic for comments and testimonials
  const [scrollComments, setScrollComments] = useState([...exampleComments, ...exampleComments, ...exampleComments, ...exampleComments]); // Duplicate for infinite scrolling
  const [scrollTestimonials, setScrollTestimonials] = useState([...testimonials, ...testimonials, ...testimonials, ...testimonials]); // Duplicate for infinite scrolling
  const exampleControls = useAnimation();
  const testimonialsControls = useAnimation();
  const exampleRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Helper function to calculate container width
  const calculateWidth = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const contentWidth = ref.current.scrollWidth; // Total scrollable width of the content
      const containerWidth = ref.current.offsetWidth; // Visible width of the container
      return contentWidth > containerWidth ? contentWidth : containerWidth;
    }
    return 0;
  };

  // Infinite scroll effect for comments
  useEffect(() => {
    const scrollWidth = calculateWidth(exampleRef);

    if (scrollWidth > 0) {
      const loopAnimation = () => {
        exampleControls.start({
          x: [0, -scrollWidth / 2], // Scroll halfway since content is duplicated
          transition: {
            duration: scrollWidth / 50,
            ease: "linear",
            onComplete: () => {
              exampleControls.set({ x: 0 }); // Reset to starting position
              loopAnimation(); // Continuously loop
            },
          },
        });
      };

      loopAnimation();
    }
  }, [exampleControls]);

  // Infinite scroll effect for testimonials
  useEffect(() => {
    const scrollWidth = calculateWidth(testimonialsRef);

    if (scrollWidth > 0) {
      const loopAnimation = () => {
        testimonialsControls.start({
          x: [0, -scrollWidth / 2], // Scroll halfway since content is duplicated
          transition: {
            duration: scrollWidth / 50,
            ease: "linear",
            onComplete: () => {
              // Ensure controls.set is called only after the component has mounted
              if (testimonialsControls) {
                testimonialsControls.set({ x: 0 }); // Reset to starting position
              }
              loopAnimation(); // Continuously loop
            },
          },
        });
      };

      loopAnimation();
    }
  }, [testimonialsControls]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="w-full h-[90vh] bg-cover bg-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Speak Up. Drive Safely.<br />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join the community that's making our roads safer, one license plate at a time.
          </motion.p>
          <motion.form 
            className="flex space-x-4 w-full max-w-lg"
            onSubmit={handleSearch}
            whileHover={{ scale: 1.05 }}
          >
            <input
              type="text"
              placeholder="Enter license plate number"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              className="flex-grow px-4 py-3 bg-white text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-full shadow-md hover:from-green-500 hover:to-green-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Search
            </button>
          </motion.form>
        </div>
      </section>

      {/* Comments Marquee Section */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What People Are Saying</h2>
        <div className="overflow-hidden">
          <motion.div ref={exampleRef} className="flex space-x-6 px-6 pb-8 max-w-7xl mx-auto" animate={exampleControls}>
            {scrollComments.map((comment, index) => (
              <div key={index} className="flex-shrink-0 flex flex-col bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg w-80 border border-blue-100">
                <div className="font-mono text-2xl mb-4 text-blue-600">{comment.plate}</div>
                <p className="text-gray-700 mb-4 flex-grow">{comment.comment}</p>
                <p className="text-blue-500 font-semibold">{comment.author}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Use PlateChat Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Use PlateChat?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Open Communication</h3>
            <p className="text-gray-600">Voice your thoughts and experiences with fellow drivers, creating a safer, more aware driving community.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Anonymous Reporting</h3>
            <p className="text-gray-600">Share information without revealing your identity, fostering honest feedback while staying safe.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Community Collaboration</h3>
            <p className="text-gray-600">Work together to keep the roads safe and encourage courteous behavior on the streets.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
        <div className="overflow-hidden">
          <motion.div ref={testimonialsRef} className="flex space-x-6 px-6 pb-8 max-w-7xl mx-auto" animate={testimonialsControls}>
            {scrollTestimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 flex flex-col bg-white bg-opacity-10 p-6 rounded-xl shadow-lg w-80 backdrop-filter backdrop-blur-lg">
                <p className="text-white mb-4 flex-grow">{testimonial.text}</p>
                <p className="text-yellow-300 font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-300">
        <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-4">PlateChat</h3>
            <p className="max-w-sm">Join us to make driving safer through communication and collaboration.</p>
          </div>
          <div className="flex flex-wrap gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white transition duration-300">About Us</a></li>
                <li><a href="/careers" className="hover:text-white transition duration-300">Careers</a></li>
                <li><a href="/press" className="hover:text-white transition duration-300">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/terms" className="hover:text-white transition duration-300">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</a></li>
                <li><a href="/cookies" className="hover:text-white transition duration-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}