// import { Parallax } from 'react-parallax';
// import Nasa from '../image/nasa.jpg'
// const ImageOne = () => (
//     <Parallax className='image' blur={0} bgImage={Nasa} strength={800} bgImageStyle={{minHeight:"100vh"}}>
//         <div className='content'>
//             <span className="img-txt">a trip to Space</span>
//         </div>
//     </Parallax>
// );

// export default ImageOne
import React, { useEffect, Suspense, useRef, useState } from 'react';
import { Parallax } from 'react-parallax';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment, Stars } from '@react-three/drei';
import { Sparkles, Home, Sofa, Bed, Palette, Lamp, Ruler, Award } from 'lucide-react';
import img1 from '../image/villaDay.jpg';
import img2 from '../image/img2.png';
import img3 from '../image/img3.png';
import img4 from '../image/img4.png';
import img5 from '../image/img5.png';
import img6 from '../image/img6.png';
import img7 from '../image/img7.png';
import img8 from '../image/img8.png';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSphere = ({ color }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial color={color} attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
  );
};

const RotatingCube = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <MeshDistortMaterial color="#b45309" attach="material" distort={0.3} speed={1.5} roughness={0.3} metalness={0.9} />
      </mesh>
    </Float>
  );
};

const TorusKnot3D = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.25;
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshDistortMaterial color="#ea580c" attach="material" distort={0.2} speed={2} roughness={0.1} metalness={1} />
      </mesh>
    </Float>
  );
};

const Scene3D = ({ type = 'sphere', color = '#d97706' }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1} color={color} />
        <pointLight position={[10, -10, -5]} intensity={0.8} color="#f59e0b" />
        {type === 'sphere' && <AnimatedSphere color={color} />}
        {type === 'cube' && <RotatingCube />}
        {type === 'torus' && <TorusKnot3D />}
        <Environment preset="sunset" />
        {type === 'sphere' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      </Suspense>
    </Canvas>
  );
};

const TextBox = ({ title, children, icon: Icon }) => {
  return (
    <div className="text-box">
      {Icon && <Icon className="text-box-icon" />}
      <h3>{title}</h3>
      <div className="text-divider" />
      {children}
    </div>
  );
};

const LoadingScreen = ({ isLoading }) => {
  return (
    <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
      <div className="loading-bg-animation"></div>
      <div className="loading-content">
        <div className="loading-icon-wrapper">
          <div className="loading-ring"></div>
          <div className="loading-ring-2"></div>
          <div className="loading-icon-container">
            <Palette className="loading-icon" />
          </div>
        </div>
        <h1 className="loading-title">
          <span>Z</span><span>A</span><span>I</span>
        </h1>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
          <div className="loading-bar-glow"></div>
        </div>
        <p className="loading-subtitle">
          <span>I</span><span>n</span><span>t</span><span>e</span><span>r</span><span>i</span><span>o</span><span>r</span>
          <span className="space"> </span>
          <span>D</span><span>e</span><span>s</span><span>i</span><span>g</span><span>n</span>
          <span className="space"> </span>
          <span>S</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span>
        </p>
        <div className="loading-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
};

const LuxuryVillaWebsite = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.image').forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        });
      });
      gsap.utils.toArray('.text-box').forEach((box) => {
        gsap.from(box.children, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: #000;
        color: #fff;
        overflow-x: hidden;
      }
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.8s ease, visibility 0.8s ease;
        overflow: hidden;
      }
      .loading-screen.fade-out {
        opacity: 0;
        visibility: hidden;
      }
      .loading-bg-animation {
        position: absolute;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at center, 
          rgba(217, 119, 6, 0.15) 0%, 
          rgba(180, 83, 9, 0.1) 25%,
          transparent 50%);
        animation: rotateBg 20s linear infinite;
      }
      @keyframes rotateBg {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
      }
      .loading-content {
        text-align: center;
        position: relative;
        z-index: 2;
      }
      .loading-icon-wrapper {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto 3rem;
      }
      .loading-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140px;
        height: 140px;
        border: 3px solid transparent;
        border-top-color: #d97706;
        border-right-color: #d97706;
        border-radius: 50%;
        animation: spinRing 2s linear infinite;
      }
      .loading-ring-2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 110px;
        height: 110px;
        border: 3px solid transparent;
        border-bottom-color: #f59e0b;
        border-left-color: #f59e0b;
        border-radius: 50%;
        animation: spinRingReverse 1.5s linear infinite;
      }
      @keyframes spinRing {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes spinRingReverse {
        0% { transform: translate(-50%, -50%) rotate(360deg); }
        100% { transform: translate(-50%, -50%) rotate(0deg); }
      }
      .loading-icon-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: floatIcon 3s ease-in-out infinite;
      }
      @keyframes floatIcon {
        0%, 100% { transform: translate(-50%, -50%) translateY(0px) scale(1); }
        50% { transform: translate(-50%, -50%) translateY(-10px) scale(1.1); }
      }
      .loading-icon {
        width: 60px;
        height: 60px;
        color: #d97706;
        filter: drop-shadow(0 0 30px rgba(217, 119, 6, 0.8));
        animation: pulseIcon 2s ease-in-out infinite;
      }
      @keyframes pulseIcon {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      .loading-title {
        font-size: 4.5rem;
        font-weight: 200;
        margin-bottom: 2.5rem;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        letter-spacing: 0.3em;
      }
      .loading-title span {
        display: inline-block;
        background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #d97706 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: letterPop 3s ease-in-out infinite;
        text-shadow: 0 0 40px rgba(217, 119, 6, 0.5);
      }
      .loading-title span:nth-child(1) { animation-delay: 0s; }
      .loading-title span:nth-child(2) { animation-delay: 0.2s; }
      .loading-title span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes letterPop {
        0%, 100% { 
          transform: translateY(0) scale(1);
          filter: brightness(1);
        }
        50% { 
          transform: translateY(-8px) scale(1.15);
          filter: brightness(1.5);
        }
      }
      .loading-bar-container {
        width: 350px;
        height: 4px;
        background: rgba(217, 119, 6, 0.15);
        margin: 0 auto 1.5rem;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 0 20px rgba(217, 119, 6, 0.2);
      }
      .loading-bar {
        height: 100%;
        background: linear-gradient(90deg, #d97706, #f59e0b, #fb923c, #f59e0b, #d97706);
        background-size: 300% 100%;
        animation: loadingBar 3.5s ease-in-out, shimmerBar 2s linear infinite;
        box-shadow: 0 0 30px rgba(217, 119, 6, 1);
        position: relative;
      }
      .loading-bar-glow {
        position: absolute;
        top: -2px;
        left: 0;
        width: 100px;
        height: 8px;
        background: radial-gradient(ellipse, rgba(255, 255, 255, 0.8), transparent);
        animation: glowMove 2s ease-in-out infinite;
        filter: blur(5px);
      }
      @keyframes loadingBar {
        0% { width: 0%; }
        100% { width: 100%; }
      }
      @keyframes shimmerBar {
        0% { background-position: 0% 50%; }
        100% { background-position: 300% 50%; }
      }
      @keyframes glowMove {
        0%, 100% { left: 0%; opacity: 0; }
        50% { left: 70%; opacity: 1; }
      }
      .loading-subtitle {
        font-size: 1.1rem;
        text-transform: uppercase;
        color: #9ca3af;
        font-weight: 300;
        display: flex;
        justify-content: center;
        gap: 0.15rem;
        flex-wrap: wrap;
      }
      .loading-subtitle span {
        display: inline-block;
        animation: fadeInLetter 2s ease-in infinite;
      }
      .loading-subtitle span:nth-child(1) { animation-delay: 0.1s; }
      .loading-subtitle span:nth-child(2) { animation-delay: 0.2s; }
      .loading-subtitle span:nth-child(3) { animation-delay: 0.3s; }
      .loading-subtitle span:nth-child(4) { animation-delay: 0.4s; }
      .loading-subtitle span:nth-child(5) { animation-delay: 0.5s; }
      .loading-subtitle span:nth-child(6) { animation-delay: 0.6s; }
      .loading-subtitle span:nth-child(7) { animation-delay: 0.7s; }
      .loading-subtitle span:nth-child(8) { animation-delay: 0.8s; }
      .loading-subtitle span:nth-child(10) { animation-delay: 1s; }
      .loading-subtitle span:nth-child(11) { animation-delay: 1.1s; }
      .loading-subtitle span:nth-child(12) { animation-delay: 1.2s; }
      .loading-subtitle span:nth-child(13) { animation-delay: 1.3s; }
      .loading-subtitle span:nth-child(14) { animation-delay: 1.4s; }
      .loading-subtitle span:nth-child(15) { animation-delay: 1.5s; }
      .loading-subtitle span:nth-child(16) { animation-delay: 1.6s; }
      .loading-subtitle span:nth-child(17) { animation-delay: 1.7s; }
      .loading-subtitle span:nth-child(18) { animation-delay: 1.8s; }
      .loading-subtitle span:nth-child(19) { animation-delay: 1.9s; }
      .loading-subtitle span:nth-child(20) { animation-delay: 2.0s; }
      .loading-subtitle span:nth-child(21) { animation-delay: 2.1s; }
      .loading-subtitle span:nth-child(22) { animation-delay: 2.2s; }
      .loading-subtitle .space { width: 0.5rem; }
      @keyframes fadeInLetter {
        0%, 100% { opacity: 0.4; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-3px); }
      }
      .loading-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #d97706;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(217, 119, 6, 0.8);
        animation: particleFloat 4s ease-in-out infinite;
      }
      .particle:nth-child(1) {
        left: 10%;
        animation-delay: 0s;
        animation-duration: 3s;
      }
      .particle:nth-child(2) {
        left: 30%;
        animation-delay: 0.5s;
        animation-duration: 3.5s;
      }
      .particle:nth-child(3) {
        left: 50%;
        animation-delay: 1s;
        animation-duration: 4s;
      }
      .particle:nth-child(4) {
        left: 70%;
        animation-delay: 1.5s;
        animation-duration: 3.2s;
      }
      .particle:nth-child(5) {
        left: 85%;
        animation-delay: 2s;
        animation-duration: 3.8s;
      }
      .particle:nth-child(6) {
        left: 20%;
        animation-delay: 2.5s;
        animation-duration: 3.3s;
      }
      @keyframes particleFloat {
        0% {
          top: 100%;
          opacity: 0;
          transform: translateX(0) scale(0);
        }
        10% {
          opacity: 1;
          transform: translateX(10px) scale(1);
        }
        90% {
          opacity: 1;
          transform: translateX(-10px) scale(1);
        }
        100% {
          top: -10%;
          opacity: 0;
          transform: translateX(0) scale(0);
        }
      }
      .image {
        min-height: 100vh;
        position: relative;
      }
      .image .content {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        z-index: 2;
        padding: 2rem;
      }
      .content-wrapper {
        max-width: 800px;
        text-align: center;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(15px);
        padding: 3rem;
        border-radius: 20px;
        border: 1px solid rgba(217, 119, 6, 0.4);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      .content span.img-txt {
        background: linear-gradient(135deg, rgba(217, 119, 6, 0.95), rgba(180, 83, 9, 0.95));
        text-transform: uppercase;
        color: #fff;
        padding: 1.5rem 2.5rem;
        font-size: 2rem;
        letter-spacing: 14px;
        font-weight: 300;
        border-radius: 12px;
        box-shadow: 0 15px 50px rgba(217, 119, 6, 0.4);
        display: inline-block;
        transition: all 0.3s ease;
      }
      .content span.img-txt:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 60px rgba(217, 119, 6, 0.6);
      }
      .content-icon {
        width: 72px;
        height: 72px;
        color: #d97706;
        margin: 0 auto 1.5rem;
        animation: float 3s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .text-box {
        background: linear-gradient(180deg, #000 0%, #0f0f0f 50%, #000 100%);
        padding: 2rem 2rem;
        height: 70vh;
        position: relative;
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
      }
      .text-box-icon {
        width: 40px;
        height: 40px;
        color: #d97706;
        margin: 0 auto 1rem;
        display: block;
      }
      h3 {
        letter-spacing: 8px;
        text-transform: uppercase;
        font-size: 1.8rem;
        text-align: center;
        font-weight: 300;
        color: #d97706;
        margin-bottom: 0.6rem;
      }
      .text-divider {
        width: 80px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #d97706, transparent);
        margin: 0.8rem auto 1.5rem;
      }
      .text-box p {
        text-align: center;
        line-height: 1.6;
        color: #d1d5db;
        font-size: 0.95rem;
        max-width: 900px;
        margin: 0 auto 1rem;
      }
      .text-box-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        max-width: 1000px;
        margin: 1.5rem auto 0;
      }
      .feature-card {
        background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(180, 83, 9, 0.08));
        border: 1px solid rgba(217, 119, 6, 0.35);
        border-radius: 14px;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.1), transparent);
        transition: left 0.5s;
      }
      .feature-card:hover::before {
        left: 100%;
      }
      .feature-card:hover {
        background: linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(180, 83, 9, 0.15));
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 15px 40px rgba(217, 119, 6, 0.3);
        border-color: rgba(217, 119, 6, 0.6);
      }
      .feature-number {
        font-size: 2.2rem;
        color: #d97706;
        font-weight: 300;
        margin-bottom: 0.4rem;
        text-shadow: 0 0 20px rgba(217, 119, 6, 0.5);
      }
      .feature-label {
        color: #9ca3af;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      .model-overlay {
        position: absolute;
        z-index: 1;
        pointer-events: none;
        mix-blend-mode: screen;
      }
      .model-right {
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        opacity: 1;
      }
      .model-left {
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        opacity: 1;
      }
      .model-center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        opacity: 1;
      }
      @media (max-width: 768px) {
        .loading-title {
          font-size: 2.8rem;
          gap: 0.3rem;
          letter-spacing: 0.2em;
        }
        .loading-icon {
          width: 50px;
          height: 50px;
        }
        .loading-icon-wrapper {
          width: 120px;
          height: 120px;
        }
        .loading-ring {
          width: 110px;
          height: 110px;
        }
        .loading-ring-2 {
          width: 85px;
          height: 85px;
        }
        .loading-bar-container {
          width: 250px;
        }
        .loading-subtitle {
          font-size: 0.9rem;
        }
        .content span.img-txt {
          font-size: 1.3rem;
          letter-spacing: 8px;
          padding: 1.2rem 1.8rem;
        }
        h3 {
          font-size: 1.5rem;
          letter-spacing: 4px;
        }
        .content-wrapper {
          padding: 2rem;
        }
        .text-box {
          padding: 3rem 1.5rem;
        }
        .model-right, .model-left {
          width: 70%;
        }
        .model-center {
          width: 80%;
          height: 80%;
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
      <LoadingScreen isLoading={loading} />
      <Parallax className="image" blur={0} bgImage={img1} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-right">
          <Scene3D type="sphere" color="#d97706" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Palette className="content-icon" />
            <span className="img-txt">ZAI Design</span>
          </div>
        </div>
      </Parallax>
      <TextBox title="Welcome to ZAI" icon={Home}>
        <p>ZAI is a premier interior design studio specializing in creating bespoke, luxurious living spaces that reflect your unique style and personality.</p>
        <p>With over 15 years of experience, we transform homes into masterpieces of modern elegance and functional beauty.</p>
        <div className="text-box-features">
          <div className="feature-card"><div className="feature-number">15+</div><div className="feature-label">Years Experience</div></div>
          <div className="feature-card"><div className="feature-number">200+</div><div className="feature-label">Projects Completed</div></div>
          <div className="feature-card"><div className="feature-number">5★</div><div className="feature-label">Client Rating</div></div>
        </div>
      </TextBox>
      <Parallax className="image" blur={0} bgImage={img2} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-left">
          <Scene3D type="cube" color="#b45309" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Sofa className="content-icon" />
            <span className="img-txt">Living Spaces</span>
          </div>
        </div>
      </Parallax>
      <TextBox title="Art of Living" icon={Sofa}>
        <p>We craft living rooms that blend comfort with sophistication. From custom furniture layouts to curated art collections, every detail is thoughtfully designed.</p>
        <p>Our signature style combines contemporary minimalism with warm, inviting textures and personalized lighting schemes.</p>
        <div className="text-box-features">
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Custom Layouts</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Smart Lighting</div></div>
        </div>
      </TextBox>
      <Parallax className="image" blur={0} bgImage={img3} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-right">
          <Scene3D type="torus" color="#ea580c" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Palette className="content-icon" />
            <span className="img-txt">Color & Texture</span>
          </div>
        </div>
      </Parallax>
      <TextBox title="Material Mastery" icon={Palette}>
        <p>Our designers are experts in material selection - from Italian marble to sustainable woods, luxury fabrics to artisanal tiles.</p>
        <p>We source globally to bring you exclusive finishes that elevate your space beyond the ordinary.</p>
        <div className="text-box-features">
          <div className="feature-card"><div className="feature-number">50+</div><div className="feature-label">Premium Vendors</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Sustainable Options</div></div>
        </div>
      </TextBox>
      <Parallax className="image" blur={0} bgImage={img4} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-center">
          <Scene3D type="sphere" color="#f59e0b" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Bed className="content-icon" />
            <span className="img-txt">Bedroom Sanctuaries</span>
          </div>
        </div>
      </Parallax>
      <TextBox title="Restful Retreats" icon={Bed}>
        <p>Create your personal oasis with custom headboards, layered lighting, and premium linens. We design bedrooms for restorative sleep and serene mornings.</p>
        <p>From walk-in wardrobes to en-suite spa bathrooms, every element promotes tranquility and luxury.</p>
        <div className="text-box-features">
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Custom Closets</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Layered Lighting</div></div>
        </div>
      </TextBox>
      <Parallax className="image" blur={0} bgImage={img5} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-left">
          <Scene3D type="cube" color="#c2410c" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Lamp className="content-icon" />
            <span className="img-txt">Lighting Design</span>
          </div>
        </div>
      </Parallax>
      <TextBox title="Illumination Artistry" icon={Lamp}>
        <p>Lighting is the soul of interior design. We create multi-layered lighting schemes with architectural integration and smart controls.</p>
        <p>From statement chandeliers to hidden LED strips, every light source serves both function and ambiance.</p>
        <div className="text-box-features">
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Smart Controls</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Architectural Integration</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Custom Fixtures</div></div>
        </div>
      </TextBox>
      <Parallax className="image" blur={0} bgImage={img6} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-right">
          <Scene3D type="torus" color="#fb923c" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Ruler className="content-icon" />
            <span className="img-txt">Space Planning</span>
          </div>
        </div>
      </Parallax>
      <TextBox title="Spatial Intelligence" icon={Ruler}>
        <p>Maximize your home's potential with expert space planning. We optimize flow, functionality, and aesthetics in every square foot.</p>
        <p>Our 3D modeling and virtual walkthroughs ensure perfect proportions before construction begins.</p>
        <div className="text-box-features">
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">3D Modeling</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Virtual Tours</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Flow Optimization</div></div>
        </div>
      </TextBox>
      <Parallax className="image" blur={0} bgImage={img7} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-center">
          <Scene3D type="sphere" color="#d97706" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Award className="content-icon" />
            <span className="img-txt">Award-Winning</span>
          </div>
        </div>
      </Parallax>
      <TextBox title="Design Excellence" icon={Award}>
        <p>ZAI has been recognized with multiple design awards for innovative residential projects that push creative boundaries.</p>
        <p>Featured in Architectural Digest, Elle Decor, and winner of the International Property Awards for Best Interior Design.</p>
        <div className="text-box-features">
          <div className="feature-card"><div className="feature-number">12</div><div className="feature-label">Design Awards</div></div>
          <div className="feature-card"><div className="feature-number">50+</div><div className="feature-label">Publications</div></div>
          <div className="feature-card"><div className="feature-number">✓</div><div className="feature-label">Global Recognition</div></div>
        </div>
      </TextBox>
      <Parallax className="image" blur={0} bgImage={img8} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className="model-overlay model-center">
          <Scene3D type="torus" color="#f59e0b" />
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Sparkles className="content-icon" />
            <span className="img-txt">Transform with ZAI</span>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default LuxuryVillaWebsite;