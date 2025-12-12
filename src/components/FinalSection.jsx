import React, { useRef, useEffect } from 'react';
import ParallaxLayer from './ParallaxLayer';
import ImageLayer from './ImageLayer';
import registerScrollTrigger, { ScrollTrigger } from '../hooks/useScrollTrigger';
import gsap from 'gsap';

const FinalSection = () => {
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
        y: () => `-${depth * 28}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
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
        <ParallaxLayer depth={0.12} mouseReactive={false} className="layer-bg parallax-scroll">
          <ImageLayer src={'/assets/images/final-full-bg.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.25} mouseReactive={true} className="layer-mid parallax-scroll left-0">
          <ImageLayer src={'/assets/images/final-left-home.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.3} mouseReactive={true} className="layer-mid parallax-scroll right-0">
          <ImageLayer src={'/assets/images/final-waterfall-right.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.45} mouseReactive={true} className="layer-mid parallax-scroll">
          <ImageLayer src={'/assets/images/final-mid-bg-strip.png'} />
        </ParallaxLayer>

        <ParallaxLayer depth={0.8} mouseReactive={true} className="layer-fg parallax-scroll">
          <ImageLayer src={'/assets/images/final-grass.png'} />
        </ParallaxLayer>

        <div className="layer-text absolute inset-0 flex items-end justify-center pb-12">
          <div className="text-white text-4xl md:text-6xl font-extrabold fade-in">Stay a Little Longer</div>
        </div>
      </div>
    </section>
  );
};

export default FinalSection;
