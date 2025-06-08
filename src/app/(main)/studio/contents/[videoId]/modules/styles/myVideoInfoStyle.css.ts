import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

export const myVideoInfoStyle = {
  container: style({
    'padding': '0 2rem 2rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  thumbnail: style({
    'width': '24rem',
    'aspectRatio': '16/9',
    'background': colorStyleVars.black,
    'borderRadius': '0.5rem',
    'overflow': 'hidden',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { width: '100%' } },
  }),

  info: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
  }),

  title: style({
    fontWeight: 700,
    fontSize: '1.25rem',
  }),
};
