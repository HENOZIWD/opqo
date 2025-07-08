import { colorStyleVars } from '@/styles/constant';
import { CSSProperties, style } from '@vanilla-extract/css';

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
