import { colorStyleVars } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const liveCardStyle = {
  liveTag: style({
    position: 'absolute',
    left: '0.75rem',
    top: '0.75rem',
    padding: '0.25rem',
    backgroundColor: colorStyleVars.red,
    color: colorStyleVars.white,
    fontWeight: 900,
    fontSize: '0.75rem',
    borderRadius: '0.25rem',
  }),
};
