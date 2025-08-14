"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, ChevronDown, ChevronUp } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FolioFooter = () => {
  const [email, setEmail] = useState("")
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      {/* Video/Brand Section */}
      <section className="relative h-[360px] bg-[#1A1A1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 border-2 border-white mx-auto mb-6 flex items-center justify-center">
              <span className="font-serif text-2xl">LC</span>
            </div>
            <h3 className="font-serif text-2xl mb-2">The Literary Collection</h3>
            <p className="text-sm opacity-80">Timeless Stories, Exceptional Editions</p>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-white border-t border-[#E5E5E5]">
        <div className="content-container py-16">
          {/* Desktop Footer */}
          <div className="hidden md:grid grid-cols-4 gap-12">
            {/* Newsletter Column */}
            <div>
              <h4 className="overline mb-4">STAY INSPIRED</h4>
              <p className="text-sm text-[#666] mb-4">
                Be the first to discover new editions, exclusive offers, and literary events.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-[#E5E5E5] text-sm mb-3 outline-none focus:border-[#1A1A1A]"
                  required
                />
                <button type="submit" className="btn-full">
                  JOIN
                </button>
              </form>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="overline mb-4">CUSTOMER SERVICE</h4>
              <ul className="space-y-2">
                <li>
                  <LocalizedClientLink href="/faq" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    FAQs
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/delivery" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Delivery & Returns
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/privacy" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/cookies" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Cookie Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/terms" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Terms & Conditions
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="overline mb-4">ABOUT US</h4>
              <ul className="space-y-2">
                <li>
                  <LocalizedClientLink href="/about" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/press" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Press & Media
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/awards" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Awards
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/careers" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Careers
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/sustainability" className="text-sm text-[#666] hover:text-[#1A1A1A]">
                    Sustainability
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="overline mb-4">CONTACT US</h4>
              <p className="text-sm text-[#666] mb-2">020 7400 4200</p>
              <p className="text-sm text-[#666] mb-4">
                <a href="mailto:enquiries@literarycollection.com" className="hover:text-[#1A1A1A]">
                  enquiries@literarycollection.com
                </a>
              </p>
              <p className="text-sm text-[#666]">
                Monday - Friday<br />
                9:00 AM - 6:00 PM GMT
              </p>
            </div>
          </div>

          {/* Mobile Footer - Accordion Style */}
          <div className="md:hidden">
            {/* Newsletter */}
            <div className="mb-6 pb-6 border-b border-[#E5E5E5]">
              <h4 className="overline mb-4">STAY INSPIRED</h4>
              <p className="text-sm text-[#666] mb-4">
                Be the first to discover new editions and exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-[#E5E5E5] text-sm mb-3"
                  required
                />
                <button type="submit" className="btn-full">
                  JOIN
                </button>
              </form>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Customer Service */}
              <div className="border-b border-[#E5E5E5]">
                <button
                  onClick={() => toggleSection('customer')}
                  className="w-full flex justify-between items-center py-3"
                >
                  <span className="overline">CUSTOMER SERVICE</span>
                  {expandedSection === 'customer' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'customer' && (
                  <ul className="pb-4 space-y-2">
                    <li><LocalizedClientLink href="/faq" className="text-sm text-[#666]">FAQs</LocalizedClientLink></li>
                    <li><LocalizedClientLink href="/delivery" className="text-sm text-[#666]">Delivery & Returns</LocalizedClientLink></li>
                    <li><LocalizedClientLink href="/privacy" className="text-sm text-[#666]">Privacy Policy</LocalizedClientLink></li>
                    <li><LocalizedClientLink href="/terms" className="text-sm text-[#666]">Terms & Conditions</LocalizedClientLink></li>
                  </ul>
                )}
              </div>

              {/* About */}
              <div className="border-b border-[#E5E5E5]">
                <button
                  onClick={() => toggleSection('about')}
                  className="w-full flex justify-between items-center py-3"
                >
                  <span className="overline">ABOUT THE COLLECTION</span>
                  {expandedSection === 'about' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'about' && (
                  <ul className="pb-4 space-y-2">
                    <li><LocalizedClientLink href="/about" className="text-sm text-[#666]">Our Story</LocalizedClientLink></li>
                    <li><LocalizedClientLink href="/press" className="text-sm text-[#666]">Press & Media</LocalizedClientLink></li>
                    <li><LocalizedClientLink href="/awards" className="text-sm text-[#666]">Awards</LocalizedClientLink></li>
                  </ul>
                )}
              </div>

              {/* Contact */}
              <div className="border-b border-[#E5E5E5] pb-4">
                <h4 className="overline mb-3">CONTACT US</h4>
                <p className="text-sm text-[#666]">020 7400 4200</p>
                <p className="text-sm text-[#666]">enquiries@literarycollection.com</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logo and Tagline */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center">
                  <span className="font-serif text-sm">LC</span>
                </div>
                <span className="font-serif text-sm">Love Books, Love Life.</span>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="text-[#666] hover:text-[#1A1A1A]">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Twitter" className="text-[#666] hover:text-[#1A1A1A]">
                  <Twitter size={20} />
                </a>
                <a href="#" aria-label="Instagram" className="text-[#666] hover:text-[#1A1A1A]">
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="YouTube" className="text-[#666] hover:text-[#1A1A1A]">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8">
              <p className="text-xs text-[#999]">
                ©The Literary Collection {new Date().getFullYear()} | Site by Tom&Co
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default FolioFooter