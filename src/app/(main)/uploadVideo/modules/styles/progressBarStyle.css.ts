import { colorStyleVars } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const progressBarStyle = {
  container: style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
    height: '1.25rem',
  }),

  background: style({
    position: 'relative',
    background: colorStyleVars.lightGray,
    width: '100%',
    height: '1rem',
    borderRadius: 9999,
    overflow: 'hidden',
  }),

  progress: style({
    position: 'relative',
    background: colorStyleVars.blue,
    height: '1rem',
    borderRadius: '0.25rem',
  }),

  text: style({ width: '4rem' }),
};
