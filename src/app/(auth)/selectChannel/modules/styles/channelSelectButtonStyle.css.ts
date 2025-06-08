import { style } from '@vanilla-extract/css';

export const channelSelectButtonStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '8rem',
  }),

  button: style({
    border: 'none',
    outline: 'none',
    width: '8rem',
    height: '8rem',
    cursor: 'pointer',
  }),

  name: style({
    fontSize: '1.5rem',
    textAlign: 'center',
  }),
};
