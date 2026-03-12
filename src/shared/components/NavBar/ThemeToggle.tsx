'use client';

import { useState } from 'react';
import Button from '../Button/Button';

const THEMES = ['light', 'dark'] as const;
type ThemeName = (typeof THEMES)[number];

const isThemeName = (value: string | null): value is ThemeName => {
  return !!value && THEMES.includes(value as ThemeName);
};

const getInitialTheme = (): ThemeName => {
  if (typeof document === 'undefined') return 'light';

  const htmlTheme = document.documentElement.getAttribute('data-theme');
  if (isThemeName(htmlTheme)) return htmlTheme;

  try {
    const storedTheme = localStorage.getItem('theme');
    if (isThemeName(storedTheme)) return storedTheme;
  } catch {}

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const applyTheme = (theme: ThemeName) => {
  const html = document.documentElement;
  const isDark = theme === 'dark';

  html.setAttribute('data-theme', theme);
  html.classList.toggle('dark', isDark);

  try {
    localStorage.setItem('theme', theme);
  } catch {}
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <Button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center p-0 border-border-strong"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '🌙' : '☀️'}
    </Button>
  );
}
