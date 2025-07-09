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
};
