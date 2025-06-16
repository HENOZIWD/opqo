import { MEDIA_QUERY_THRESHOLD } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

export const studioInfoStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1.5rem',
    'padding': '1.5rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  channelImage: style({
    width: '8rem',
    height: '8rem',
  }),

  channelName: style({
    fontSize: '1.75rem',
    fontWeight: 700,
  }),

  loadError: style({ textAlign: 'center' }),
};
