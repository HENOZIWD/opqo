import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const liveStreamInfoStyle = {
  container: style({
    'padding': '0 1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  title: style({
    margin: '1.5rem 0.5rem 1rem',
    fontSize: '1.5rem',
    fontWeight: 900,
  }),

  channel: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  }),

  channelImage: style({
    width: '3.5rem',
    height: '3.5rem',
  }),

  channelName: style({
    fontWeight: 900,
    fontSize: '1.25rem',
  }),

  info: style({
    'margin': '1rem 0.5rem',
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '1rem',

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        flexDirection: 'column',
        gap: '0.5rem',
      },
    },
  }),
};
