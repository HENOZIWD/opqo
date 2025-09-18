import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const liveStreamPageStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'row',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { flexDirection: 'column' } },
  }),

  liveWrapper: style({ flexGrow: 1 }),

  live: style({
    width: '100%',
    aspectRatio: '64/27',
  }),

  notStreaming: style({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: colorStyleVars.black,
    color: colorStyleVars.white,
    fontSize: '1.25rem',
    fontWeight: 700,
  }),
};
