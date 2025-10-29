import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

const buttonDefaultStyle = style({
  'display': 'flex',
  'borderRadius': 9999,
  'background': theme.color.text,
  'color': theme.color.background,
  'cursor': 'pointer',
  'whiteSpace': 'nowrap',
  'padding': '0.625rem 1.25rem',
  'fontWeight': 900,
  'fontSize': '1.125rem',
  'justifyContent': 'center',

  ':disabled': {
    background: theme.color.gray,
    cursor: 'default',
  },
});

export const buttonStyle = {
  default: buttonDefaultStyle,

  small: style([buttonDefaultStyle, {
    padding: '0.375rem 0.875rem',
    fontWeight: 700,
    fontSize: '0.875rem',
  }]),
};
