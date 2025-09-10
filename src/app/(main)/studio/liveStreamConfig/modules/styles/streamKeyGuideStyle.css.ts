import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const streamKeyGuideStyle = {
  container: style({
    'padding': '2rem 1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: '2rem 0' } },
  }),

  summary: style({ cursor: 'pointer' }),

  imageWrapper: style({
    position: 'relative',
    maxWidth: '48rem',
    aspectRatio: '19/12',
    margin: '1rem 0',
  }),

  image: style({ objectFit: 'contain' }),

  guideList: style({
    marginTop: '1rem',
    paddingLeft: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }),
};
