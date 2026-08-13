"use client";

import { motion } from "framer-motion";

const videos = [
  { id: "z9dbndWhhm0", title: "Top Video 1" },
  { id: "d7s2yBdZ1hc", title: "Top Video 2" },
  { id: "1b3Q7qde2uM", title: "Top Video 3" }
];

export default function LatestContent() {
  return (
    <section className="py-24 px-6 sm:px-12 bg-[#050505] text-white relative scanlines">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-8"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase font-gamer-heading">Latest From Snazzy</h2>
          </div>
          <a href="https://www.youtube.com/@SnazzyZone" target="_blank" rel="noopener noreferrer" className="bg-[#080808] self-start sm:self-auto rounded-full px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300 border border-white/10 hover:border-white shadow-lg font-gamer-body">
            Watch More
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-video bg-[#080808] rounded-2xl overflow-hidden relative border border-white/5 transition-colors shadow-2xl gamer-border">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
