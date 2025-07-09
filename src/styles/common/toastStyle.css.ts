import { style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from '../constants';
import { calc } from '@vanilla-extract/css-utils';

export const toastStyle = {
  container: style({
    'position': 'absolute',
    'minWidth': '22.5rem',
    'padding': '1rem 2rem',
    'fontSize': '1rem',
    'border': `1px solid ${colorStyleVars.black}`,
    'borderRadius': '0.5rem',
    'boxShadow': `0 0 0.25rem 0.25rem ${colorStyleVars.blackShadow}`,
    'top': 0,
    'left': '50%',
    'transition': 'transform 0.5s',
    'transform': 'translateX(-50%) translateY(-5rem)',
    'whiteSpace': 'pre',
    'textAlign': 'center',
    'background': colorStyleVars.white,
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
    border: `1px solid ${colorStyleVars.red}`,
    color: colorStyleVars.red,
    boxShadow: `0 0 0.25rem 0.25rem ${colorStyleVars.redShadow}`,
  }),

  show: style({ transform: 'translateX(-50%) translateY(3rem)' }),
};
