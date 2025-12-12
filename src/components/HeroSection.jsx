import React, { useRef, useEffect } from 'react';
import ParallaxLayer from './ParallaxLayer';
import ImageLayer from './ImageLayer';
import registerScrollTrigger, { ScrollTrigger } from '../hooks/useScrollTrigger';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    registerScrollTrigger();
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    const layers = Array.from(section.querySelectorAll('[data-depth]'));

    const st = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        pin: true,
      },
    });

    // We don't animate here; use ScrollTrigger.create to set translate by progress
    const trigger = gsap.core.globals().ScrollTrigger
      ? null
      : null; // placeholder

    const stInstance = gsap.utils.toArray(layers).forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0;
      // animate y using ScrollTrigger per element
      gsap.to(el, {
        y: () => `-${depth * 30}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
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
    <section ref={sectionRef} className="parallax-section hero-container relative">
      <div className="section-inner relative w-full h-screen">
        <ParallaxLayer depth={0.15} mouseReactive={false} className="layer-bg parallax-scroll">
          <ImageLayer src={'/Background.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.4} mouseReactive={true} className="layer-mid parallax-scroll">
          <ImageLayer src={'/assets/images/hero-overlay.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.8} mouseReactive={true} className="layer-fg parallax-scroll">
          <ImageLayer src={'/heroBg.png'} />
        </ParallaxLayer>

        <div className="layer-text absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="hero-text text-white text-5xl md:text-7xl font-bold fade-in">Villa Luxe</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
