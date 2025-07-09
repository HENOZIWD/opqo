import { style } from '@vanilla-extract/css';
import { colorStyleVars } from '../constants';

export const videoListSkeletonStyle = {
  container: style({
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }),

  thumbnail: style({
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    background: colorStyleVars.lightGray,
    borderRadius: '0.5rem',
  }),

  text: style({
    width: '100%',
    height: '1.5rem',
    background: colorStyleVars.lightGray,
    borderRadius: '0.5rem',
  }),
};
