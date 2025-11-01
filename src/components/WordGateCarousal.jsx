import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WordGateSection = ({ word, description, index, isLast }) => {
  const sectionRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const descriptionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    const description = descriptionRef.current;
    const container = containerRef.current;

    // Set initial state
    gsap.set(description, { opacity: 0, scale: 0.9 });
    gsap.set(container, { x: index === 0 ? 0 : '100vw' });
    gsap.set([topHalf, bottomHalf], { yPercent: 0 });
    
    // Initially show full word in top half only
    topHalf.style.clipPath = 'inset(0 0 0 0)';
    topHalf.style.height = '100vh';
    bottomHalf.style.opacity = '0';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: isLast ? '+=150%' : '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // If not first, slide in from right
    if (index > 0) {
      tl.to(container, {
        x: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0);
    }

    // Start splitting the word
    tl.to(topHalf, {
      height: '50vh',
      clipPath: 'inset(0 0 50% 0)',
      duration: 0.4,
      ease: 'power2.inOut'
    }, index === 0 ? 0 : 0.8)
    .to(bottomHalf, {
      opacity: 1,
      duration: 0.01,
    }, index === 0 ? 0.2 : 1.0)
    
    // Phase 1: Open the gate vertically (up/down)
    .to(topHalf, {
      yPercent: -100,
      duration: 1,
      ease: 'power2.inOut'
    }, index === 0 ? 0.4 : 1.2)
    .to(bottomHalf, {
      yPercent: 100,
      duration: 1,
      ease: 'power2.inOut'
    }, index === 0 ? 0.4 : 1.2)
    .to(description, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out'
    }, index === 0 ? 0.7 : 1.5);

    // Phase 2: Hold open
    tl.to({}, { duration: 0.5 });

    // Phase 3: Slide entire container to left (only if not last)
    if (!isLast) {
      tl.to(container, {
        x: '-100vw',
        duration: 1,
        ease: 'power2.inOut'
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [index, isLast]);

  return (
    <div ref={sectionRef} className="word-gate-section">
      <div ref={containerRef} className="word-container">
        <div className="word-gate-wrapper">
          <div ref={topHalfRef} className="word-half word-top">
            <span className="word-text">{word}</span>
          </div>
          <div ref={bottomHalfRef} className="word-half word-bottom">
            <span className="word-text">{word}</span>
          </div>
        </div>
        <div ref={descriptionRef} className="description-text">
          {description}
        </div>
      </div>
    </div>
  );
};

const WordGateCarousel = () => {
  const sections = [
    {
      word: "RESPONSIBILITY",
      description: "Short supply chains, limited printing, green hosting: we optimize the resources needed for each project. Let us integrate the RGAA accessibility principles, and act guided by ethical and human values in every collaboration."
    },
    {
      word: "INNOVATION",
      description: "Pushing boundaries with cutting-edge technology and creative solutions. We embrace new ideas and methodologies to deliver exceptional results that exceed expectations."
    },
    {
      word: "EXCELLENCE",
      description: "Committed to the highest standards of quality in every project. Our dedication to perfection drives us to continuously improve and deliver outstanding outcomes."
    },
    {
      word: "COLLABORATION",
      description: "Building strong partnerships through open communication and shared goals. Together, we achieve more and create lasting impact through unified efforts."
    }
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background: #f5f5f5;
        overflow-x: hidden;
      }

      .word-gate-section {
        height: 100vh;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: #f5f5f5;
      }

      .word-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        will-change: transform;
      }

      .word-gate-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 2;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .word-half {
        position: absolute;
        width: 100%;
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        will-change: transform;
        background: #f5f5f5;
      }

      .word-top {
        top: 0;
        align-items: center;
      }

      .word-bottom {
        bottom: 0;
        align-items: flex-start;
      }

      .word-top .word-text {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .word-bottom .word-text {
        position: absolute;
        top: 50vh;
        transform: translateY(-50%);
        clip-path: inset(50% 0 0 0);
      }

      .word-text {
        font-size: clamp(3rem, 10vw, 8rem);
        font-weight: 900;
        letter-spacing: -0.02em;
        line-height: 1;
        user-select: none;
        color: #000;
        white-space: nowrap;
      }

      .description-text {
        position: absolute;
        max-width: 800px;
        text-align: center;
        padding: 2rem;
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.6;
        color: #333;
        z-index: 1;
        will-change: opacity, transform;
      }

      .spacer {
        height: 50vh;
      }

      @media (max-width: 768px) {
        .word-text {
          font-size: clamp(2rem, 8vw, 4rem);
        }

        .description-text {
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          padding: 1.5rem;
          max-width: 90%;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return (
    <div>
      <div className="spacer" />
      {sections.map((section, index) => (
        <WordGateSection
          key={index}
          word={section.word}
          description={section.description}
          index={index}
          isLast={index === sections.length - 1}
        />
      ))}
      <div className="spacer" />
    </div>
  );
};

export default WordGateCarousel;