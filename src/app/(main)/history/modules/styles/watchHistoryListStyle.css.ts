import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const watchHistoryListStyle = {
  container: style({
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'padding': '0 1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  list: style({
    width: '100%',
    maxWidth: '64rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }),

  date: style({
    margin: '1rem 0',
    fontSize: '1.25rem',
    fontWeight: 700,
  }),
};
