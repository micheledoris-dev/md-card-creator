import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfig = {
  hasUrl: Boolean(supabaseUrl),
  hasKey: Boolean(supabaseAnonKey),
  urlPreview: supabaseUrl ? `${supabaseUrl.slice(0, 32)}...` : 'mancante',
  keyPreview: supabaseAnonKey ? `${supabaseAnonKey.slice(0, 12)}...${supabaseAnonKey.slice(-8)}` : 'mancante',
  urlLooksValid: Boolean(supabaseUrl && supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co') && !supabaseUrl.includes('/rest/v1')),
  keyLooksValid: Boolean(supabaseAnonKey && (supabaseAnonKey.startsWith('eyJ') || supabaseAnonKey.startsWith('sb_publishable_')))
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseConfig.urlLooksValid &&
  supabaseConfig.keyLooksValid
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null
