import { style } from '@vanilla-extract/css';
import { colorStyleVars } from '../constants';

export const thumbnailStyle = {
  container: style({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: colorStyleVars.black,
  }),

  image: style({ objectFit: 'contain' }),

  duration: style({
    position: 'absolute',
    right: '0.75rem',
    bottom: '0.75rem',
    padding: '0.25rem',
    background: colorStyleVars.black,
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: colorStyleVars.white,
  }),

  watchProgress: style({
    position: 'absolute',
    bottom: 0,
    height: '0.375rem',
    width: '100%',
  }),
};
