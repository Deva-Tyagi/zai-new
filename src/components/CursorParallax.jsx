import React, { createContext, useState, useEffect } from 'react';

export const CursorContext = createContext({ x: 0, y: 0 });

const CursorParallax = ({ children }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let rafId = null;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    function onMove(e) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      target.x = (e.clientX / w) * 2 - 1; // -1..1
      target.y = (e.clientY / h) * 2 - 1;
      if (!rafId) rafLoop();
    }

    function rafLoop() {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      // update CSS variables for vanilla-CSS transforms
      document.documentElement.style.setProperty('--cursor-x', current.x);
      document.documentElement.style.setProperty('--cursor-y', current.y);
      setCursor({ x: current.x, y: current.y });
      rafId = requestAnimationFrame(rafLoop);
    }

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <CursorContext.Provider value={cursor}>{children}</CursorContext.Provider>;
};

export default CursorParallax;
