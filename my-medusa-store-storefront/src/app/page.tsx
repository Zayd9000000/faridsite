import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to GB as default region
  redirect('/gb')
}