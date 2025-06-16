import { formContainerStyle } from '@/styles/form.css';
import { style } from '@vanilla-extract/css';

export const thumbnailSelectorStyle = {
  container: style([formContainerStyle, { alignItems: 'center' }]),

  input: style({ display: 'none' }),

  label: style({
    cursor: 'pointer',
    padding: '0.25rem 0',
  }),

  previewWrapper: style({
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
  }),

  preview: style({ objectFit: 'cover' }),

  description: style({
    'fontSize': '0.875rem',

    '::before': {
      content: '•',
      paddingRight: '0.5rem',
    },
  }),
};
