import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from '@/styles/constant';
import { style } from '@vanilla-extract/css';

export const myVideoInfoStyle = {
  container: style({
    'padding': '0 2rem 2rem',
    'maxWidth': '40rem',
    'margin': '0 auto',
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  thumbnail: style({
    width: '100%',
    aspectRatio: '16/9',
    background: colorStyleVars.black,
    borderRadius: '0.5rem',
    overflow: 'hidden',
  }),

  title: style({
    fontWeight: 700,
    fontSize: '1.25rem',
  }),
};
