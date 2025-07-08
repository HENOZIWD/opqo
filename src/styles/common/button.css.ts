import { style } from '@vanilla-extract/css';
import { colorStyleVars } from '../constant';

const containerStyle = style({
  'display': 'flex',
  'borderRadius': 9999,
  'background': colorStyleVars.black,
  'color': colorStyleVars.white,
  'cursor': 'pointer',
  'whiteSpace': 'nowrap',
  'padding': '0.625rem 1.25rem',
  'fontWeight': 900,
  'fontSize': '1.125rem',
  'justifySelf': 'center',

  ':disabled': {
    background: colorStyleVars.lightGray,
    cursor: 'default',
  },
});

export const buttonStyle = {
  default: containerStyle,
  small: style([containerStyle, {
    padding: '0.375rem 0.875rem',
    fontWeight: 700,
    fontSize: '0.875rem',
  }]),
};
