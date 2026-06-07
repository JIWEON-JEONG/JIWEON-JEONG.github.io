import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import type { PostLanguage } from '@q00-blog/shared'

const STORAGE_KEY = 'wpti-lang'

interface LangContextValue {
  lang: PostLanguage
  setLang: (lang: PostLanguage) => void
  toggle: () => void
}

const LangContext = createContext<LangContextValue | undefined>(undefined)

const detect = (): PostLanguage => {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<PostLanguage>('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    setLangState(saved === 'ko' || saved === 'en' ? saved : detect())
  }, [])

  const setLang = (next: PostLanguage) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore storage errors
    }
  }

  const toggle = () => setLang(lang === 'ko' ? 'en' : 'ko')

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LangProvider')
  return ctx
}
