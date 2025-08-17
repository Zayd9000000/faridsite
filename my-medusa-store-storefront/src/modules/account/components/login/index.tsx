import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-md w-full flex flex-col"
      data-testid="login-page"
    >
      <h1 className="font-serif text-[32px] leading-[36px] font-medium text-[#1A1A1A] mb-3 text-center">
        Welcome Back
      </h1>
      <p className="text-center text-[15px] leading-[24px] text-[#666] mb-10">
        Sign in to access your account and continue your literary journey.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-[0.8px] text-[#666] block mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              data-testid="email-input"
              className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.8px] text-[#666] block mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              data-testid="password-input"
              className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <button
          type="submit"
          data-testid="sign-in-button"
          className="w-full bg-[#1A1A1A] text-white py-4 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-black transition-all duration-200 mt-8"
        >
          Sign In
        </button>
      </form>
      <div className="text-center text-[14px] text-[#666] mt-8">
        New to Sparrow Hall?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-[#1A1A1A] font-medium hover:underline"
          data-testid="register-button"
        >
          Create Account
        </button>
      </div>
      
      <div className="mt-12 pt-8 border-t border-[#E5E5E5] text-center">
        <p className="text-[14px] text-[#666] italic">
          "A room without books is like a body without a soul."
        </p>
        <p className="text-[12px] text-[#999] mt-2">— Marcus Tullius Cicero</p>
      </div>
    </div>
  )
}

export default Login
