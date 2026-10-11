import React from 'react';
import { INSTAGRAM_POSTS } from '../data/products';
import { ArrowRight, ExternalLink } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramGallery() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header matching mockup */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#E9E2D5] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
            @primewoodenwork
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
            Follow the Work
          </h2>
        </div>
        
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-charcoal-700 hover:text-wood-700 transition-colors inline-flex items-center space-x-1.5 group"
        >
          <span>Follow on Instagram</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* 4 Photo Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {INSTAGRAM_POSTS.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-[#EFECE6] border border-[#E9E2D5] block"
          >
            <img
              src={post.image}
              alt="Prime Wooden Work craft detail"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <InstagramIcon className="w-5 h-5 text-white/90" />
              </div>
              <div>
                <p className="text-[11px] font-sans leading-relaxed line-clamp-2 text-white/90">
                  {post.caption}
                </p>
                <span className="text-[10px] tracking-widest text-wood-200 mt-2 block uppercase">
                  ♥ {post.likes}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
