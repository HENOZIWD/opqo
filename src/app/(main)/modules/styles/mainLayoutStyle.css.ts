import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const mainLayoutStyle = {
  content: style({
    position: 'relative',
    marginTop: '3.75rem',
    height: calc('100%').subtract('3.75rem').toString(),
    overflowY: 'auto',
  }),
};
