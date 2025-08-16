"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full min-h-[calc(100vh-72px)] flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1A1A1A]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200')`,
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            <h2 className="font-serif text-[40px] leading-[44px] font-medium mb-6">
              Welcome to The Literary Collection
            </h2>
            <p className="text-[16px] leading-[26px] text-white/90">
              Discover rare editions, timeless classics, and carefully curated literary treasures that celebrate the art of bookmaking.
            </p>
            <div className="mt-12 pt-12 border-t border-white/20">
              <p className="text-[14px] text-white/70 italic">
                "A room without books is like a body without a soul."
              </p>
              <p className="text-[12px] text-white/60 mt-2">— Marcus Tullius Cicero</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
