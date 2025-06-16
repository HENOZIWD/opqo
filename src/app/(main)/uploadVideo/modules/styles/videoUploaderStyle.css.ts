import { colorStyleVars } from '@/styles/common.css';
import { formContainerStyle } from '@/styles/form.css';
import { style } from '@vanilla-extract/css';

export const videoUploaderStyle = {
  container: style([formContainerStyle, { alignItems: 'center' }]),

  previewTitle: style({
    fontSize: '1.125rem',
    width: '100%',
  }),

  preview: style({
    width: '100%',
    aspectRatio: '16/9',
    background: colorStyleVars.lightGray,
  }),

  input: style({ display: 'none' }),

  label: style({
    cursor: 'pointer',
    padding: '0.25rem 0',
  }),

  progress: style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }),
};
