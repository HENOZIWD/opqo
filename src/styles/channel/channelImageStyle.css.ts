import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

const containerStyle = style({
  position: 'relative',
  display: 'flex',
  borderRadius: 9999,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  flexShrink: 0,
});

export const channelImageStyle = {
  container: containerStyle,

  image: style({ objectFit: 'cover' }),

  live: style([containerStyle, { border: `0.375rem solid ${theme.color.error}` }]),

  liveTag: style({
    position: 'absolute',
    display: 'inline-block',
    bottom: 0,
    background: theme.color.error,
    color: theme.color.text,
    borderRadius: '0.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 700,
    padding: '0.125rem 0.25rem',
    fontSize: '0.875rem',
  }),
};
