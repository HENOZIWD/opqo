import { style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './common.css';

export const myVideoInfoStyle = {
  container: style({
    'padding': '0 2rem 2rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  thumbnail: style({
    'width': '24rem',
    'aspectRatio': '16/9',
    'background': colorStyleVars.black,
    'borderRadius': '0.5rem',
    'overflow': 'hidden',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { width: '100%' } },
  }),

  info: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
  }),

  title: style({
    fontWeight: 700,
    fontSize: '1.25rem',
  }),
};

export const studioContentCardStyle = {
  info: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
  }),
};

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

export const studioInfoSectionStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }),

  title: style({
    fontSize: '0.875rem',
    color: colorStyleVars.gray,
    fontWeight: 400,
  }),

  content: style({ wordBreak: 'break-all' }),
};
