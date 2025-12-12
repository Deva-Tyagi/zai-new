import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const ImageLayer = ({ src, alt = '', className = '' }) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="opacity"
      className={`layer-img ${className}`}
      wrapperClassName=""
    />
  );
};

export default ImageLayer;
