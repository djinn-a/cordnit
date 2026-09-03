import React from 'react';
import Link from 'next/link';
import { Network, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full relative py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop"
          alt="Colorful Background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 max-w-container-xl mx-auto flex flex-col justify-between min-h-[400px]">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Logo and Tagline */}
          <div className="lg:w-1/4">
            <Link href="/" className="flex flex-col items-start text-black mb-6">
              <div className="flex items-center relative">
                <Network className="h-6 w-6 text-black" />
                <div className="absolute top-0 right-0 w-1 h-1 bg-black rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-black rounded-full"></div>
              </div>
              <span className="font-bold text-lg leading-none mt-1 tracking-wide">Cordinit</span>
              <span className="text-[0.45rem] font-medium leading-none mt-1 tracking-wider opacity-60 uppercase">Your Cloud Creation</span>
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
              Let's talk about your next milestone—and how to reach it
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:w-[60%] flex flex-wrap justify-between gap-8">
            {/* Column 1 - Company */}
            <div>
              <h4 className="text-black font-bold mb-5 uppercase tracking-widest text-section-subtitle">Company</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">About</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Contact</Link></li>
              </ul>
            </div>
            {/* Column 2 - Company (Duplicate in image) */}
            <div>
              <h4 className="text-black font-bold mb-5 uppercase tracking-widest text-section-subtitle">Company</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">About</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Contact</Link></li>
              </ul>
            </div>
            {/* Column 3 - Capabilities */}
            <div>
              <h4 className="text-black font-bold mb-5 uppercase tracking-widest text-section-subtitle">Capabilities</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Solutions</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Industries</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Accelerators</Link></li>
              </ul>
            </div>
            {/* Column 4 - Legal */}
            <div>
              <h4 className="text-black font-bold mb-5 uppercase tracking-widest text-section-subtitle">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Terms of use</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Sitemap</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Responsible Disclosure</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-black text-body-small font-medium">Cookies</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Details (Right edge) */}
          <div className="lg:w-auto text-right">
            <p className="text-gray-600 text-body-xs mb-1 font-medium">+1 (999) 999-99-99</p>
            <p className="text-gray-600 text-body-xs font-medium">info@logoipsum.com</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-end mt-auto pt-8">
          {/* Social Icons */}
          <div className="flex space-x-3 mb-4 sm:mb-0">
            {/* X (Twitter) */}
            <a href="#" className="w-8 h-8 rounded-full bg-footer-icon flex items-center justify-center text-white hover:bg-black transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" className="w-8 h-8 rounded-full bg-footer-icon flex items-center justify-center text-white hover:bg-black transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 0 5.385 0 12.03c0 2.115.553 4.175 1.603 5.993L.508 24l6.124-1.607a12.035 12.035 0 005.4 1.266 12.032 12.032 0 0012.03-12.03A12.033 12.033 0 0012.031 0zm0 21.642a9.98 9.98 0 01-5.088-1.39l-.364-.216-3.784.992.997-3.69-.237-.378a9.96 9.96 0 01-1.523-5.32c0-5.513 4.487-10 10-10a10 10 0 0110 10c0 5.512-4.487 10-10 10zm5.485-7.494c-.301-.15-1.785-.88-2.062-.98-.278-.1-.48-.15-.683.15-.202.3-.778.98-.954 1.18-.175.2-.35.225-.65.075-.3-.15-1.275-.47-2.427-1.5-.898-.802-1.503-1.792-1.68-2.093-.176-.3-.01-.462.133-.612.135-.135.302-.351.452-.526.15-.175.201-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.683-1.647-.936-2.253-.247-.594-.497-.514-.683-.524-.176-.01-.378-.01-.581-.01-.202 0-.528.075-.805.375-.278.3-1.054 1.03-1.054 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.115 3.226 5.122 4.526 2.013.87 2.766.726 3.272.6 1.045-.25 2.39-1.025 2.72-1.925.33-.9.33-1.675.232-1.835-.098-.16-.381-.26-.683-.41z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="w-8 h-8 rounded-full bg-footer-icon flex items-center justify-center text-white hover:bg-black transition-colors">
              <Play className="h-3 w-3 ml-0.5" fill="currentColor" />
            </a>
          </div>

          {/* Address */}
          <div className="text-right">
            <p className="text-gray-700 text-section-subtitle font-bold">1901 Thornridge Cir. Shiloh,</p>
            <p className="text-gray-700 text-section-subtitle font-bold">Hawaii 81063</p>
          </div>
        </div>

      </div>

      {/* Latest from Cordinit Section */}
      <div className="relative z-10 max-w-container-xl mx-auto mt-16 px-4 sm:px-6 lg:px-16 pb-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-16">

          {/* Video Thumbnail Area */}
          <div className="w-full md:w-[45%] relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-900/10">
            <h4 className="absolute top-4 left-6 text-white/50 text-[0.55rem] font-bold tracking-[0.2em] uppercase z-20">
              LATEST FROM CORDINIT
            </h4>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
              alt="Video Thumbnail"
              className="w-full h-64 object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer transition-colors hover:bg-black/40">
              <div className="w-16 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Play className="h-5 w-5 text-blue-600 ml-1" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Text Content Area */}
          <div className="w-full md:w-[55%] text-white">
            <h3 className="text-xl md:text-2xl font-medium mb-6 leading-snug">
              Technology, security & transformation — in conversation.
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              Insights from Cordinit's technology and security experts on building secure, intelligent organisations.
            </p>
            <a href="#" className="inline-flex items-center text-blue-500 font-semibold text-xs tracking-wider uppercase hover:text-blue-400 transition-colors">
              WATCH ON YOUTUBE <span className="ml-1 text-lg leading-none">→</span>
            </a>
          </div>
        </div>

        {/* Very Bottom Footer Text */}
        <div className="flex justify-between items-center text-white/50 text-xs font-medium border-t border-white/10 pt-6">
          <p>© 2026 — Copyright</p>
          <p className="cursor-pointer hover:text-white transition-colors">Privacy</p>
        </div>
      </div>
    </footer>
  );
}
