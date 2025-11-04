import { colorStyleVars } from '@/styles/constants';
import { theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const themeSelectorStyle = {
  button: style({
    'width': '2rem',
    'height': '2rem',
    'borderRadius': '9999px',
    'padding': '0.375rem',
    'background': colorStyleVars.lightGrayShadow,

    ':hover': { background: theme.color.gray },
  }),
};
