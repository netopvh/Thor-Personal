import { useEffect, useState } from 'react';

/**
 * Detecta prefers-reduced-motion para respeitar acessibilidade.
 * Mantém uma flag simples para ser consumida em animações (CSS/JS).
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onChange = () => setReduced(mediaQuery.matches);

    // Suporte para browsers mais antigos
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  return reduced;
}

