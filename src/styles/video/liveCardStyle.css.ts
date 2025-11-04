import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const liveCardStyle = {
  liveTag: style({
    position: 'absolute',
    left: '0.75rem',
    top: '0.75rem',
    padding: '0.25rem',
    backgroundColor: theme.color.error,
    color: theme.color.background,
    fontWeight: 900,
    fontSize: '0.75rem',
    borderRadius: '0.25rem',
  }),
};
