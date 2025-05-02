import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '2rem',
  'padding': '0 2rem 1rem',
  'alignItems': 'center',

  '@media': { 'screen and (width < 40rem)': { padding: 0 } },
});
