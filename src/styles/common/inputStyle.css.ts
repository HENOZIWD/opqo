import { style } from '@vanilla-extract/css';
import { colorStyleVars } from '../constants';

const inputWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

const inputContainerStyle = style({
  'border': `1px solid ${colorStyleVars.black}`,
  'outline': 'none',
  'borderRadius': '1rem',
  'padding': '1rem 1.5rem',
  'fontSize': '1.125rem',
  'width': '100%',
  'transition': 'box-shadow 0.25s',
  'background': 'inherit',
  'color': colorStyleVars.black,

  ':focus': { boxShadow: `0 0 0.25rem 0.25rem ${colorStyleVars.blackShadow}` },

  ':disabled': { background: colorStyleVars.lightGray },
});

const inputErrorStyle = style({
  'border': `1px solid ${colorStyleVars.red}`,

  ':focus': { boxShadow: `0 0 0.25rem 0.25rem ${colorStyleVars.redShadow}` },
});

const inputCounterStyle = style({
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  alignSelf: 'flex-end',
});

export const inputStyle = {
  wrapper: inputWrapperStyle,
  container: inputContainerStyle,
  error: inputErrorStyle,
  counter: inputCounterStyle,
};

export const textareaStyle = {
  wrapper: inputWrapperStyle,

  container: style([inputContainerStyle, {
    resize: 'none',
    overflow: 'hidden',
  }]),

  error: inputErrorStyle,
  counter: inputCounterStyle,
};
