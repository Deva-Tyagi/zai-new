import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/*
  ParallaxLayer
  - depth: 0..1 number controls movement magnitude
  - mouseReactive: whether to apply CSS-variable cursor micro-parallax
  - children or imgSrc
  Note: outer wrapper receives scroll transforms (GSAP), inner receives cursor micro-transforms via CSS vars.
*/
const ParallaxLayer = ({ depth = 0.4, mouseReactive = true, className = '', children, imgSrc }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.setProperty('--depth', depth);
      innerRef.current.setAttribute('data-mouse-reactive', mouseReactive ? 'true' : 'false');
    }
  }, [depth, mouseReactive]);

  return (
    <div ref={outerRef} className={`parallax-outer ${className}`} data-depth={depth} style={{ position: 'absolute', inset: 0 }}>
      <div ref={innerRef} className="parallax-inner">
        {imgSrc ? <img src={imgSrc} alt="" className="layer-img" loading="lazy" /> : children}
      </div>
    </div>
  );
};

ParallaxLayer.propTypes = {
  depth: PropTypes.number,
  mouseReactive: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  imgSrc: PropTypes.string,
};

export default ParallaxLayer;
