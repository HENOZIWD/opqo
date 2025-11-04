import { style } from '@vanilla-extract/css';
import { MEDIA_QUERY_THRESHOLD } from '../constants';
import { calc } from '@vanilla-extract/css-utils';
import { theme } from '../theme.css';

export const toastStyle = {
  container: style({
    'position': 'absolute',
    'minWidth': '22.5rem',
    'padding': '1rem 2rem',
    'fontSize': '1rem',
    'border': `1px solid ${theme.color.text}`,
    'borderRadius': '0.5rem',
    'boxShadow': `0 0 0.25rem 0.25rem ${theme.color.shadow}`,
    'top': 0,
    'left': '50%',
    'transition': 'transform 0.5s',
    'transform': 'translateX(-50%) translateY(-5rem)',
    'whiteSpace': 'pre',
    'textAlign': 'center',
    'background': theme.color.background,
    'zIndex': 9999,

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        minWidth: calc('100%').subtract('2rem').toString(),
        whiteSpace: 'normal',
        padding: '0.75rem 1.25rem',
      },
    },
  }),

  error: style({
    border: `1px solid ${theme.color.error}`,
    color: theme.color.error,
    boxShadow: `0 0 0.25rem 0.25rem ${theme.color.errorShadow}`,
  }),

  show: style({ transform: 'translateX(-50%) translateY(3rem)' }),
};
