import { style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './common.css';

export const formContainerStyle = style({
  'width': '33rem',
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '1rem',
  'margin': '0 auto 1rem',

  '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { width: '100%' } },
});

export const formStyle = {
  container: formContainerStyle,

  error: style({
    'color': colorStyleVars.red,

    '::before': {
      content: '•',
      paddingRight: '0.5rem',
    },
  }),

  submit: style({
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'flex-end',
  }),
};
