import React, { useEffect, useRef } from "react";

export default function VillaWebsite() {
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!section2Ref.current || !section3Ref.current) return;

      const section2 = section2Ref.current;
      const section2Rect = section2.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section 2 bottom has reached the bottom of viewport
      if (section2Rect.bottom <= windowHeight) {
        // Calculate how much to move section 3 up
        const overlapAmount = windowHeight - section2Rect.bottom;
        section3Ref.current.style.transform = `translateY(-${overlapAmount}px)`;
      } else {
        section3Ref.current.style.transform = 'translateY(0)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');
        
        .michroma-font {
          font-family: 'Michroma', sans-serif;
        }

        /* Responsive container */
        .villa-container {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
        }

        /* Scale everything proportionally */
        @media (max-width: 1920px) {
          .villa-container {
            transform: scale(calc(100vw / 1920));
            transform-origin: top center;
          }
        }

        @media (max-width: 768px) {
          .villa-container {
            transform: scale(calc(100vw / 1920));
            transform-origin: top left;
          }
        }
      `}</style>

      {/* Main Container - All sections overlap */}
      <div className="villa-container relative" style={{ width: "1920px", height: "2550px" }}>
        {/* SECTION 1 - Hero Section */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{ height: "1148.81px" }}
        >
          {/* BG Gradient Layer - Full section coverage */}
          <img
            src="Background.png"
            alt="Background Gradient"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              width: "1722.98px",
              height: "1148.81px",
            }}
          />

          {/* BG Mountains */}
          <img
            src="mountainBg.png"
            alt="Background Mountains"
            className="absolute"
            style={{
              width: "956px",
              height: "380.25px",
              top: "98.5px",
              left: "326.47px",
              position: "fixed",
            }}
          />

          {/* Front Mountains */}
          <img
            src="mountainF.png"
            alt="Front Mountains"
            className="absolute"
            style={{
              width: "1779px",
              height: "341.23px",
              top: "167.37px",
            }}
          />

          {/* Multiple Trees Below Mountains */}
          <img
            src="belowMountain.png"
            alt="Multiple Trees"
            className="absolute"
            style={{
              width: "1384.32px",
              height: "297.85px",
              top: "377px",
              left: "106.79px",
            }}
          />

          {/* Trees Behind Villa */}
          <img
            src="belowhero.png"
            alt="Trees Behind Villa"
            className="absolute"
            style={{
              width: "1886.89px",
              height: "803.68px",
              top: "304px",
              left: "-88.89px",
            }}
          />

          {/* Left Tree 1 */}
          <img
            src="tree1.png"
            alt="Left Tree 1"
            className="absolute"
            style={{
              width: "559.76px",
              height: "746.97px",
              top: "213px",
              left: "-171.71px",
            }}
          />

          {/* Left Tree 2 */}
          <img
            src="tree2.png"
            alt="Left Tree 2"
            className="absolute"
            style={{
              width: "475.96px",
              height: "688.48px",
              top: "351.77px",
              left: "94.75px",
            }}
          />

          {/* Hero Text Content */}
          <div
            className="absolute michroma-font"
            style={{
              width: "596px",
              height: "302px",
              top: "257px",
              left: "189px",
            }}
          >
            <h1
              style={{
                fontSize: "150px",
                lineHeight: "150.88px",
                fontWeight: "400",
                letterSpacing: "0%",
                color: "white",
              }}
            >
              VILLA
              <br />
              <span style={{ color: "#FFA500" }}>LUXE</span>
            </h1>
            <p
              className="text-white"
              style={{
                fontSize: "20px",
                marginTop: "10px",
                fontFamily: "serif",
              }}
            >
              Where Dreams Reside
            </p>
          </div>

          {/* Villa */}
          <img
            src="vila.png"
            alt="Villa Main"
            className="absolute"
            style={{
              width: "923.75px",
              height: "460.21px",
              top: "444px",
              left: "889px",
            }}
          />

          {/* Grass Vector 1 */}
          <img
            src="Vector.png"
            alt="Grass Vector 1"
            className="absolute"
            style={{
              width: "414.82px",
              height: "115.21px",
              top: "766px",
              left: "967.29px",
            }}
          />

          {/* Grass Vector 2 */}
          <img
            src="Vector.png"
            alt="Grass Vector 2"
            className="absolute"
            style={{
              width: "414.70px",
              height: "125.70px",
              top: "769.31px",
              left: "1303.97px",
            }}
          />
        </div>

        {/* SECTION 2 - Waterfall Section (Overlapping with Section 1) */}
        <div
          ref={section2Ref}
          className="absolute w-full"
          style={{ height: "1209px", top: "871px" }}
        >
          {/* Waterfall - Left Side (connects with section 1) */}
          <video
            src="waterfallV.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute water-mask"
            style={{
              width: "1012px",
              height: "1376px",
              top: "0px",
              left: "-44px",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />

          {/* Right BG Gradient (50% width, overlaps waterfall by 10%) */}
          <img
            src="bg1.png"
            alt="Right Background Gradient"
            className="absolute"
            style={{
              width: "1123px",
              height: "1209px",
              top: "0px",
              left: "557px",
            }}
          />

          {/* Text Content */}
          <div
            className="absolute michroma-font"
            style={{
              width: "652px",
              height: "160px",
              top: "226px",
              left: "885px",
            }}
          >
            <h2
              className="text-white leading-tight"
              style={{
                fontSize: "65px",
                lineHeight: "80px",
                fontWeight: "400",
                letterSpacing: "0%",
              }}
            >
              Where Design Meets Comfort
            </h2>
            <p
              className="text-white mt-4"
              style={{
                fontSize: "18px",
                opacity: "0.9",
              }}
            >
              A harmony of space, light, and luxury.
            </p>
          </div>

          {/* Villa Image - Right Section */}
          <img
            src="villa1.png"
            alt="Villa Section 2"
            className="absolute"
            style={{
              width: "752.77px",
              height: "486.55px",
              top: "630.73px",
              left: "888px",
              
            }}
          />

          {/* Left Grass Vector */}
          <img
            src="Vector.png"
            alt="Left Grass Bottom"
            className="absolute"
            style={{
              width: "516px",
              height: "155px",
              top: "1046px",
              left: "421px",
            }}
          />

          {/* Right Grass Vector of Left One (Flipped -180deg) */}
          <img
            src="Vector.png"
            alt="Right Grass Left Area"
            className="absolute"
            style={{
              width: "516px",
              height: "155px",
              top: "1047px",
              left: "744px",
              transform: "rotateY(-180deg)",
              zIndex: "1",
            }}
          />

          {/* Right Side Grass of Waterfall */}
          <img
            src="Vector.png"
            alt="Right Grass Waterfall"
            className="absolute"
            style={{
              width: "522px",
              height: "170px",
              top: "1036px",
              left: "1387px",
              zIndex: "1",
            }}
          />

          {/* White Waterfall Upside Area PNG */}
          <img
            src="vector1.png"
            alt="White Waterfall Edge"
            className="absolute"
            style={{
              width: "487px",
              height: "71px",
              top: "1117px",
              left: "1050px",
            }}
          />
        </div>

        {/* SECTION 3 - Dining Section (Will overlap Section 2) */}
        <div
          ref={section3Ref}
          className="absolute w-full"
          style={{ 
            height: "1081px", 
            top: "2059px",
            transition: "transform 0.1s ease-out",
            willChange: "transform",
            zIndex:"2"
          }}
        >
          {/* Full BG Gradient */}
          <img
            src="bg2.png"
            alt="Section 3 Background Gradient"
            className="absolute"
            style={{
              width: "1691px",
              height: "1081px",
              top: "0px",
              left: "-6px",
            }}
          />

          {/* Waterfall Left Side Gradient (Rotated -180deg) */}
          <img
            src="bg3.png"
            alt="Waterfall Left Gradient"
            className="absolute"
            style={{
              width: "387px",
              height: "1115px",
              left: "916px",
              transform: "rotate(-180deg)",
            }}
          />

          {/* Waterfall PNG (Continuing from Section 2) */}
          <video
            src="waterfallV1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute"
            style={{
              width: "418px",
              height: "1093px",
              left: "1050px",
              objectFit: "cover",
              pointerEvents: "none"
            }}
          />

          {/* Waterfall Right Side Gradient */}
          <img
            src="bg4.png"
            alt="Waterfall Right Gradient"
            className="absolute"
            style={{
              width: "281px",
              height: "1103px",
              top: "-22px",
              left: "1426px",
            }}
          />

          {/* Text Content */}
          <div
            className="absolute michroma-font text-white"
            style={{
              width: "990px",
              height: "160px",
              top: "137px",
              left: "144px",
            }}
          >
            <h2
              style={{
                fontSize: "65px",
                lineHeight: "80px",
                fontWeight: "400",
                letterSpacing: "0%",
              }}
            >
              Where Every Meal Becomes a Memory
            </h2>
          </div>

          {/* Villa + Mountains + Trees Combined PNG */}
          <img
            src="villa2.png"
            alt="Villa Mountains Trees"
            className="absolute"
            style={{
              width: "975.16px",
              height: "796.32px",
              top: "285px",
              left: "-91px",
            }}
          />
        </div>
      </div>
    </div>
  );
}