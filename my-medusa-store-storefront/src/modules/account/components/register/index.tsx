"use client"

import { useActionState } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-md flex flex-col"
      data-testid="register-page"
    >
      <h1 className="font-serif text-[32px] leading-[36px] font-medium text-[#1A1A1A] mb-3 text-center">
        Join The Literary Collection
      </h1>
      <p className="text-center text-[15px] leading-[24px] text-[#666] mb-10">
        Create your account to access exclusive editions and curated recommendations.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] uppercase tracking-[0.8px] text-[#666] block mb-2">
                First Name
              </label>
              <input
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
                className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.8px] text-[#666] block mb-2">
                Last Name
              </label>
              <input
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
                className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.8px] text-[#666] block mb-2">
              Email Address
            </label>
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              data-testid="email-input"
              className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.8px] text-[#666] block mb-2">
              Phone Number (Optional)
            </label>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
              className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.8px] text-[#666] block mb-2">
              Password
            </label>
            <input
              name="password"
              required
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
              className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              placeholder="Create a password"
            />
          </div>
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <div className="text-center text-[12px] text-[#666] mt-6">
          By creating an account, you agree to our{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-[#1A1A1A] hover:underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-[#1A1A1A] hover:underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </div>
        <button
          type="submit"
          className="w-full bg-[#1A1A1A] text-white py-4 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-black transition-all duration-200 mt-8"
          data-testid="register-button"
        >
          Create Account
        </button>
      </form>
      <div className="text-center text-[14px] text-[#666] mt-8">
        Already have an account?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-[#1A1A1A] font-medium hover:underline"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Register