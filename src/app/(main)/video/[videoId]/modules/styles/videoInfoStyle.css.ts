import { MEDIA_QUERY_THRESHOLD } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

export const videoInfoStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1.5rem',
    'padding': '1.5rem 2rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: '1.5rem 0' } },
  }),

  title: style({
    fontSize: '1.5rem',
    fontWeight: 700,
  }),

  channelSection: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  }),

  channelImage: style({
    width: '4rem',
    height: '4rem',
  }),

  channelName: style({
    fontSize: '1.5rem',
    fontWeight: 700,
  }),

  description: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontSize: '1.125rem',
  }),
};
