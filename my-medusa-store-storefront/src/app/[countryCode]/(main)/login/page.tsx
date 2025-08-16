import { Metadata } from "next"
import LoginTemplate from "@modules/account/templates/login-template"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Login - The Literary Collection",
  description: "Sign in to your Literary Collection account to access exclusive features and manage your orders.",
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Left side - Image section */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-[#1A1A1A]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/site/cottage.jpg')`
            }}
          />
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <LocalizedClientLink
                href="/"
                className="flex items-center space-x-2 text-[#666] hover:text-[#1A1A1A] transition-colors text-[14px]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </LocalizedClientLink>
            </div>
            
            <LoginTemplate />
          </div>
        </div>
      </div>
    </div>
  )
}