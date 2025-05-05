import { style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './common.css';

export const channelImageStyle = {
  container: style({
    position: 'relative',
    display: 'flex',
    borderRadius: 9999,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }),

  image: style({ objectFit: 'cover' }),
};

export const channelSelectButtonStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '8rem',
  }),

  button: style({
    border: 'none',
    outline: 'none',
    width: '8rem',
    height: '8rem',
    cursor: 'pointer',
  }),

  name: style({
    fontSize: '1.5rem',
    textAlign: 'center',
  }),
};

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

export const channelProfileSkeletonStyle = {
  image: style({
    width: '9rem',
    height: '9rem',
    borderRadius: 9999,
    background: colorStyleVars.lightGray,
  }),

  text: style({
    width: '16rem',
    height: '2rem',
    borderRadius: '0.25rem',
    background: colorStyleVars.lightGray,
  }),
};

export const myChannelListStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '3rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),

  loadError: style({
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  }),

  empty: style({ fontSize: '1.5rem' }),
};
