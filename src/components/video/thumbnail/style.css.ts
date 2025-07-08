import { colorStyleVars } from '@/styles/constant';
import { style } from '@vanilla-extract/css';

export const thumbnailStyle = {
  container: style({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: colorStyleVars.black,
  }),

  image: style({ objectFit: 'contain' }),
};
