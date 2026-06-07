import { useRouter } from '@tanstack/react-router';
import { useTheme } from '@/contexts/ThemeContext';

interface MinimalHeaderProps {
  className?: string;
}

const ThemeToggle = () => {
  const { theme, toggleTheme, resolvedTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? '🌙' : '☀️';
    }
    return theme === 'dark' ? '🌙' : '☀️';
  };

  const getThemeLabel = () => {
    const labels = {
      light: 'Light mode',
      dark: 'Dark mode',
      system: 'System theme'
    };
    return labels[theme];
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200
                 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={getThemeLabel()}
    >
      <span className="text-lg">{getThemeIcon()}</span>
    </button>
  );
};

export const MinimalHeader = ({ className = '' }: MinimalHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: '/' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-700/50 ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-3 py-2 text-stone-600 dark:text-stone-400
                       hover:text-stone-900 dark:hover:text-white rounded-full
                       hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200
                       font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};