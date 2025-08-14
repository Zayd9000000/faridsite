"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface FolioNavProps {
  cartItemCount?: number
}

const FolioNav = ({ cartItemCount = 0 }: FolioNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navItems = [
    { label: "New Arrivals", href: "/store", hasDropdown: false },
    { 
      label: "Books", 
      href: "/store",
      hasDropdown: true,
      dropdownContent: {
        categories: [
          "Collector's Editions",
          "Fiction Masterworks",
          "Historical Epics",
          "Philosophy & Essays",
          "Poetry Collections",
          "Science & Nature",
          "Limited Editions",
          "Under £50"
        ],
        featured: [
          { title: "The Divine Comedy", author: "Dante Alighieri", price: "£125" },
          { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", price: "£95" },
          { title: "The Master and Margarita", author: "Mikhail Bulgakov", price: "£85" }
        ]
      }
    },
    { 
      label: "Collections", 
      href: "/collections",
      hasDropdown: true,
      dropdownContent: {
        categories: [
          "Literary Classics",
          "Modern Literature",
          "World Literature",
          "Gothic & Horror",
          "Science Fiction",
          "Fantasy Epics",
          "Historical Fiction",
          "Philosophy"
        ],
        featured: [
          { title: "Russian Masters", description: "Tolstoy, Dostoevsky, and more", price: "From £75" },
          { title: "Gothic Collection", description: "Dark tales and mysteries", price: "From £65" }
        ]
      }
    },
    { label: "Limited Editions", href: "/store?category=limited", hasDropdown: false },
    { label: "Gifts", href: "/store?category=gifts", hasDropdown: false },
    { label: "Last Chance", href: "/store?sale=true", hasDropdown: false },
    { label: "Journal", href: "/blog", hasDropdown: false }
  ]

  const handleMouseEnter = (label: string) => {
    if (!isMobile) {
      setActiveDropdown(label)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="h-[72px] content-container flex items-center justify-between">
          {/* Logo */}
          <LocalizedClientLink href="/" className="flex items-center">
            <div className="w-12 h-12 border-2 border-[#1A1A1A] flex items-center justify-center mr-3">
              <span className="font-serif text-lg">LC</span>
            </div>
            <span className="hidden md:block font-serif text-lg">The Literary Collection</span>
          </LocalizedClientLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <LocalizedClientLink
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </LocalizedClientLink>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-screen -ml-[50vw] mt-[1px]">
                    <div className="bg-white border-b border-[#E5E5E5] shadow-lg">
                      <div className="content-container py-10">
                        <div className="grid grid-cols-4 gap-10">
                          {/* Categories */}
                          <div className="col-span-1">
                            <h3 className="overline text-[#666] mb-4">Categories</h3>
                            <ul className="space-y-3">
                              {item.dropdownContent?.categories.map((category) => (
                                <li key={category}>
                                  <LocalizedClientLink
                                    href={`/store?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-sm text-[#1A1A1A] hover:underline"
                                  >
                                    {category}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Featured Products */}
                          <div className="col-span-3">
                            <h3 className="overline text-[#666] mb-4">Featured</h3>
                            <div className="grid grid-cols-3 gap-6">
                              {item.dropdownContent?.featured.map((product, idx) => (
                                <div key={idx} className="group cursor-pointer">
                                  <div className="h-40 bg-[#F5F5F5] mb-3 group-hover:shadow-md transition-shadow"></div>
                                  <h4 className="font-serif text-sm mb-1">{product.title || product.description}</h4>
                                  <p className="text-xs text-[#666] mb-1">{product.author || ''}</p>
                                  <p className="text-sm font-medium">{product.price}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button className="hidden md:block" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <LocalizedClientLink 
              href="/login" 
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-sm hover:bg-[#333] transition-colors text-sm"
            >
              <User size={16} strokeWidth={1.5} />
              Sign In
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart" className="relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </LocalizedClientLink>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 top-[72px] bg-white z-40">
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search our collection..."
                  className="flex-1 outline-none text-sm"
                />
              </div>
              
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <LocalizedClientLink
                      href={item.href}
                      className="block text-lg py-2 border-b border-[#F5F5F5]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </LocalizedClientLink>
                  </li>
                ))}
                <li>
                  <LocalizedClientLink
                    href="/login"
                    className="block text-lg py-2 border-b border-[#F5F5F5]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default FolioNav