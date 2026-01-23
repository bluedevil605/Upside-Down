'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { LoadingScreen } from '../LoadingScreen';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending time (e.g., connecting to Upside Down)
    // We keep the cinematic delay, then send
    setTimeout(async () => { // Make this async to await emailjs

      try {
        // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEY VALUES
        // Sign up at https://www.emailjs.com/
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'mindflayers2006@gmail.com' // Optional if hardcoded in template
        };



        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        // Success
        alert("Message sent successfully from the Upside Down!");
        setFormData({ name: '', email: '', message: '' });

      } catch (error) {
        console.error('FAILED...', error);
        alert(`Failed to send message: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
      } finally {
        setIsSending(false);
      }
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen py-20 md:py-32 flex items-center relative z-10"
      >
        <div className="max-w-4xl mx-auto px-4 w-full">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-red-600 mb-6" style={{ fontFamily: 'Special Elite, cursive' }}>
              GET IN TOUCH
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
              Have a project in mind or just want to discuss the latest season?
              Signal me from the Upside Down.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-12">
            {/* Info Side */}
            <div className="md:col-span-2 space-y-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="p-3 rounded-full bg-red-900/20 text-red-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</div>
                    <div className="font-medium">mindflayers@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="p-3 rounded-full bg-red-900/20 text-red-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</div>
                    <div className="font-medium">Punjab, India</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Currently open for freelance projects and full-time opportunities.
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs text-gray-500 uppercase tracking-wider font-semibold ml-1">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs text-gray-500 uppercase tracking-wider font-semibold ml-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs text-gray-500 uppercase tracking-wider font-semibold ml-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSending ? 'SENDING...' : 'SEND MESSAGE'}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {isSending && <LoadingScreen />}
      </AnimatePresence>
    </>
  );
}
