import { style } from '@vanilla-extract/css';

export const videoPageStyle = {
  video: style({
    width: '100%',
    aspectRatio: '64/27',
    left: 0,
  }),

  loadError: style({ margin: '1.5rem 2rem' }),
};
