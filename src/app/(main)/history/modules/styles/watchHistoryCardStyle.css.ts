import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const watchHistoryCardStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '0.75rem',

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        flexDirection: 'column',
        gap: '0.25rem',
      },
    },
  }),

  thumbnail: style({
    'height': '9rem',
    'aspectRatio': '16/9',
    'borderRadius': '0.5rem',
    'overflow': 'hidden',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { height: 'auto' } },
  }),

  info: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem 0',
  }),

  title: style({ fontWeight: '700' }),

  channel: style({
    display: 'flex',
    flexDirection: 'row',
    fontSize: '0.875rem',
    alignItems: 'center',
    gap: '0.5rem',
  }),

  channelImage: style({
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '9999px',
  }),
};
