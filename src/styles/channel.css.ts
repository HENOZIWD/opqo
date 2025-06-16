import { style } from '@vanilla-extract/css';

export const channelImageStyle = {
  container: style({
    position: 'relative',
    display: 'flex',
    borderRadius: 9999,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }),

  image: style({ objectFit: 'cover' }),
};
