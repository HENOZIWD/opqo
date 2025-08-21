import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const commentListStyle = {
  container: style({
    'padding': '1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: '1rem 0' } },
  }),

  commentCount: style({
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '1rem 0.5rem 2rem',
  }),

  commentList: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }),
};
