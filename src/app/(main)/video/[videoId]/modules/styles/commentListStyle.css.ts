import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const commentListStyle = {
  container: style({
    'padding': '1rem',
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: '1rem 0' } },
  }),
};
