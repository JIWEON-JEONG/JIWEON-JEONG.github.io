import { useState, useEffect } from 'react'
import { Link, useLocation } from '@tanstack/react-router'

type Language = 'all' | 'korean' | 'english'

interface LanguageToggleProps {
  className?: string
}

export const LanguageToggle = ({ className = '' }: LanguageToggleProps) => {
  const location = useLocation()
  const [currentLanguage, setCurrentLanguage] = useState<Language>('all')

  // Update current language based on current route
  useEffect(() => {
    if (location.pathname === '/tags/ko') {
      setCurrentLanguage('korean')
    } else if (location.pathname === '/tags/en') {
      setCurrentLanguage('english')
    } else {
      setCurrentLanguage('all')
    }
  }, [location.pathname])

  const languages: Array<{ key: Language; label: string; href: string }> = [
    { key: 'all', label: 'All', href: '/' },
    { key: 'korean', label: 'KO', href: '/tags/ko' },
    { key: 'english', label: 'EN', href: '/tags/en' }
  ]

  return (
    <div className={`inline-flex items-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50 ${className}`}>
      {languages.map((lang) => (
        <Link
          key={lang.key}
          to={lang.href}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
            currentLanguage === lang.key
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 scale-105'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-750/50'
          }`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  )
}