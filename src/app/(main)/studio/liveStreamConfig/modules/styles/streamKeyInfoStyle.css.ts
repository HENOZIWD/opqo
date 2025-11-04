import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const streamKeyInfoStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'flex-end',
    'padding': '1rem',
    'wordBreak': 'break-all',
    'gap': '1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: '1rem 0' } },
  }),

  warning: style({
    color: theme.color.error,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontWeight: 700,
  }),
};
