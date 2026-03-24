import { useState, useEffect, useRef } from 'react';

export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // 0 = section just entering viewport from bottom, 1 = section fully scrolled past top
      const raw = (windowHeight - rect.top) / (windowHeight + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { ref, progress };
}
