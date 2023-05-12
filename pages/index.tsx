import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Home from './home'

const Index = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container max-w-full">
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <Home />
      )}
    </div>
  )
}

export default Index