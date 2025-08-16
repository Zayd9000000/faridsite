"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { Menu, Search, ShoppingBag, User, X, ChevronDown, LogOut } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"

interface FolioNavProps {
  cartItemCount?: number
  customer?: HttpTypes.StoreCustomer | null
}

const FolioNav = ({ cartItemCount = 0, customer }: FolioNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const accountDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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
      href: "/store",
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
    { label: "Limited Editions", href: "/store", hasDropdown: false },
    { label: "Gifts", href: "/store", hasDropdown: false },
    { label: "Last Chance", href: "/store", hasDropdown: false },
    { label: "Journal", href: "/store", hasDropdown: false }
  ]

  const handleMouseEnter = (label: string) => {
    if (isClient && !isMobile) {
      setActiveDropdown(label)
    }
  }

  const handleMouseLeave = () => {
    if (isClient && !isMobile) {
      setActiveDropdown(null)
    }
  }

  const handleSignOut = async () => {
    const countryCode = params?.countryCode as string || 'us'
    await signout(countryCode)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="h-[72px] content-container flex items-center justify-between">
          {/* Logo */}
          <LocalizedClientLink href="/" className="flex items-center">
            <div className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center mr-3">
              <span className="font-serif text-base font-medium">LC</span>
            </div>
            <span className="hidden lg:block font-serif text-lg tracking-wide">The Literary Collection</span>
          </LocalizedClientLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <LocalizedClientLink
                  href={item.href}
                  className="text-[11px] font-normal tracking-[0.8px] uppercase text-[#1A1A1A] hover:opacity-70 transition-opacity duration-200"
                >
                  {item.label}
                </LocalizedClientLink>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-screen -ml-[50vw] mt-[1px]">
                    <div className="bg-white border-b border-[#E5E5E5] shadow-lg">
                      <div className="content-container py-8">
                        <div className="grid grid-cols-4 gap-10">
                          {/* Categories */}
                          <div className="col-span-1">
                            <h3 className="text-sm font-medium text-[#666] mb-4">Categories</h3>
                            <ul className="space-y-3">
                              {item.dropdownContent?.categories.map((category) => (
                                <li key={category}>
                                  <LocalizedClientLink
                                    href="/store"
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
                            <h3 className="text-sm font-medium text-[#666] mb-4">Featured</h3>
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
            <button className="hidden md:block p-2 hover:opacity-70 transition-opacity" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            {/* Account Section */}
            {customer ? (
              <div className="relative hidden md:block" ref={accountDropdownRef}>
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  onMouseEnter={() => setShowAccountDropdown(true)}
                  className="flex items-center gap-2 px-5 py-2 bg-[#1A1A1A] text-white hover:bg-black transition-all duration-200 text-xs uppercase tracking-wider"
                >
                  <User size={16} strokeWidth={1.5} />
                  <span>Welcome, {customer.first_name || "Guest"}</span>
                  <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Account Dropdown */}
                {showAccountDropdown && (
                  <div 
                    className="absolute right-0 mt-1 w-48 bg-white border border-[#E5E5E5] shadow-lg"
                    onMouseLeave={() => setShowAccountDropdown(false)}
                  >
                    <LocalizedClientLink 
                      href="/account"
                      className="block px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                      My Account
                    </LocalizedClientLink>
                    <LocalizedClientLink 
                      href="/account/orders"
                      className="block px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                      Order History
                    </LocalizedClientLink>
                    <LocalizedClientLink 
                      href="/account/addresses"
                      className="block px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                      Addresses
                    </LocalizedClientLink>
                    <div className="border-t border-[#E5E5E5]">
                      <button 
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
                      >
                        <LogOut size={14} strokeWidth={1.5} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LocalizedClientLink 
                href="/login" 
                className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#1A1A1A] text-white hover:bg-black transition-all duration-200 text-xs uppercase tracking-wider"
              >
                <User size={16} strokeWidth={1.5} />
                Sign In
              </LocalizedClientLink>
            )}
            <LocalizedClientLink href="/cart" className="relative p-2 hover:opacity-70 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-medium">
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
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isClient && isMobile && isMenuOpen && (
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
                {customer ? (
                  <>
                    <li>
                      <div className="text-lg py-2 border-b border-[#F5F5F5] text-[#666]">
                        Welcome, {customer.first_name || "Guest"}
                      </div>
                    </li>
                    <li>
                      <LocalizedClientLink
                        href="/account"
                        className="block text-lg py-2 border-b border-[#F5F5F5]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Account
                      </LocalizedClientLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleSignOut()
                          setIsMenuOpen(false)
                        }}
                        className="w-full text-left text-lg py-2 border-b border-[#F5F5F5] flex items-center gap-2"
                      >
                        <LogOut size={18} strokeWidth={1.5} />
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <LocalizedClientLink
                      href="/login"
                      className="block text-lg py-2 border-b border-[#F5F5F5]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </LocalizedClientLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default FolioNav