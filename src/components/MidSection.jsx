import React, { useRef, useEffect } from 'react';
import ParallaxLayer from './ParallaxLayer';
import ImageLayer from './ImageLayer';
import registerScrollTrigger, { ScrollTrigger } from '../hooks/useScrollTrigger';
import gsap from 'gsap';

const MidSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    registerScrollTrigger();
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    const layers = Array.from(section.querySelectorAll('[data-depth]'));

    layers.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0;
      gsap.to(el, {
        y: () => `-${depth * 20}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });

    return () => {
      try {
        const all = (ScrollTrigger && ScrollTrigger.getAll) ? ScrollTrigger.getAll() : [];
        all.forEach(t => t.kill());
      } catch (e) {}
      try { gsap.killTweensOf(layers); } catch (e) {}
    };
  }, []);

  return (
    <section ref={sectionRef} className="parallax-section relative h-screen">
      <div className="section-inner relative w-full h-screen">
        <ParallaxLayer depth={0.15} mouseReactive={false} className="layer-bg parallax-scroll left-0">
          <ImageLayer src={'/waterfall1.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.4} mouseReactive={true} className="layer-mid parallax-scroll right-0">
          <ImageLayer src={'/bg1.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.6} mouseReactive={true} className="layer-fg parallax-scroll right-0">
          <ImageLayer src={'/villa1.png'} />
        </ParallaxLayer>

        <div className="layer-text absolute inset-0 flex items-center justify-center">
          <div className="text-white text-3xl md:text-5xl font-semibold fade-in">A Hidden Waterfall Retreat</div>
        </div>
      </div>
    </section>
  );
};

export default MidSection;
