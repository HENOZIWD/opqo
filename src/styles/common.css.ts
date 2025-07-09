import { CSSProperties, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const colorStyleVars = {
  white: '#f1f1f1',
  black: '#000000',
  gray: '#545454',
  lightGray: '#cccccc',
  red: '#dd4c4c',
  blue: '#255CDE',

  blackShadow: '#00000080',
  redShadow: '#dd4c4c80',
  lightGrayShadow: '#cccccc80',
};

export const MEDIA_QUERY_THRESHOLD = '40rem';

export const progressBarStyle = {
  container: style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
    height: '1.25rem',
  }),

  background: style({
    position: 'relative',
    background: colorStyleVars.lightGray,
    width: '100%',
    height: '1rem',
    borderRadius: 9999,
    overflow: 'hidden',
  }),

  progress: style({
    position: 'relative',
    background: colorStyleVars.blue,
    height: '1rem',
    borderRadius: '0.25rem',
  }),

  text: style({ width: '4rem' }),
};

const sliderThumbStyleProperties: CSSProperties = {
  appearance: 'none',
  background: colorStyleVars.white,
  height: '1rem',
  width: '1rem',
  borderRadius: 9999,
  border: 'none',
  outline: 'none',
  marginTop: '-0.375rem',
};

const sliderTrackStyleProperties: CSSProperties = {
  height: '0.25rem',
  background: 'inherit',
};

export const sliderStyle = {
  container: style({
    position: 'relative',
    width: '100%',
    height: '1rem',
  }),

  progress: style({
    position: 'absolute',
    width: '100%',
    top: '0.375rem',
    left: 0,
    height: '0.25rem',
    borderRadius: 9999,
  }),

  input: style({
    'position': 'absolute',
    'width': '100%',
    'appearance': 'none',
    'background': 'transparent',
    'cursor': 'pointer',
    'height': '1rem',
    'display': 'flex',
    'alignItems': 'center',

    '::-webkit-slider-thumb': sliderThumbStyleProperties,
    '::-moz-range-thumb': sliderThumbStyleProperties,
    '::-webkit-slider-runnable-track': sliderTrackStyleProperties,
    '::-moz-range-track': sliderTrackStyleProperties,
  }),
};

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
