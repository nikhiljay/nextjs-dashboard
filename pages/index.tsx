import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Home from './home'
import Dashboard from '../components/Dashboard'

const Index = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (!session) {
      window.location.href = '/login'
    } else {
      window.location.href = '/home'
    }
  }, [])

  return (
    <div className="container max-w-full h-full">
    </div>
  )
}

export default Index