import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function registerScrollTrigger() {
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) { /* already registered or unavailable */ }
}

export { ScrollTrigger };

export default registerScrollTrigger;
