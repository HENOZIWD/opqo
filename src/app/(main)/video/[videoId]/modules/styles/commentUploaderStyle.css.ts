import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const commentUploaderStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1rem',
    'padding': '0 1rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: 0 } },
  }),

  textareaWrapper: style({
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'flex-start',
    'gap': '1rem',

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        flexDirection: 'column',
        alignItems: 'normal',
        justifyContent: 'center',
      },
    },
  }),

  textarea: style({ flexGrow: 1 }),
};
