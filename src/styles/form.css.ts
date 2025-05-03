import { style } from '@vanilla-extract/css';
import { colorStyleVars } from './common.css';

export const formStyle = {
  container: style({
    'width': '33rem',
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1rem',
    'margin': '0 auto 1rem',

    '@media': { 'screen and (width < 40rem)': { width: '100%' } },
  }),

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
