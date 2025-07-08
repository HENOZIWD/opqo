import { MEDIA_QUERY_THRESHOLD } from '@/styles/constant';
import { style } from '@vanilla-extract/css';

export const studioInfoStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1.5rem',
    'padding': '1.5rem',
    'maxWidth': '40rem',
    'margin': '0 auto',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  channelImage: style({
    width: '8rem',
    height: '8rem',
    alignSelf: 'center',
  }),

  channelName: style({
    fontSize: '1.75rem',
    fontWeight: 700,
  }),

  input: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }),

  button: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    justifyContent: 'flex-end',
  }),

  loadError: style({ textAlign: 'center' }),
};
