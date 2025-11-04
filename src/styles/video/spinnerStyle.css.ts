import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

const rotateKeyframes = keyframes({ '100%': { transform: 'rotate(360deg)' } });
const dashKeyframes = keyframes({
  '0%': {
    strokeDasharray: '1, 150',
    strokeDashoffset: 0,
  },

  '50%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: -35,
  },

  '100%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: -124,
  },
});

export const spinnerStyle = {
  container: style({
    animation: `${rotateKeyframes} 2s linear infinite`,
    width: '3rem',
    height: '3rem',
  }),

  path: style({
    stroke: theme.color.brand,
    strokeLinecap: 'round',
    animation: `${dashKeyframes} 1.5s ease-in-out infinite`,
  }),

};
