import { Metadata } from "next"
import LoginTemplate from "@modules/account/templates/login-template"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Login - The Literary Collection",
  description: "Sign in to your Literary Collection account to access exclusive features and manage your orders.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-ui-bg-subtle">
      <div className="flex min-h-screen">
        {/* Left side - Brand/Hero section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-ui-bg-base to-ui-bg-subtle items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-ui-fg-base mb-6">
              Welcome Back
            </h1>
            <p className="text-ui-fg-subtle text-lg mb-8">
              Access your literary collection and discover new masterpieces
            </p>
            <div className="space-y-4 text-ui-fg-muted">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Track your orders</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Save your wishlist</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Exclusive member offers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <LocalizedClientLink
                href="/"
                className="flex items-center space-x-2 text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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