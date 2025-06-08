import { MEDIA_QUERY_THRESHOLD } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

export const channelProfileStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '3rem',
    'padding': '1rem 2rem',

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        padding: '1rem 0',
        flexDirection: 'column',
        gap: '2rem',
      },
    },
  }),

  image: style({
    width: '9rem',
    height: '9rem',
  }),

  info: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }),

  name: style({
    fontSize: '2.5rem',
    fontWeight: 900,
  }),

  loadError: style({ margin: '1.5rem 2rem' }),
};
