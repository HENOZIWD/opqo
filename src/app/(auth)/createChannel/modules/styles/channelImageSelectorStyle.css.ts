import { MEDIA_QUERY_THRESHOLD } from '@/styles/common.css';
import { formContainerStyle } from '@/styles/form.css';
import { style } from '@vanilla-extract/css';

export const channelImageSelectorStyle = {
  container: formContainerStyle,

  inputWrapper: style({
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '1rem',
    'alignItems': 'center',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { flexDirection: 'column' } },
  }),

  previewWrapper: style({
    position: 'relative',
    width: '6.25rem',
    height: '6.25rem',
    borderRadius: 9999,
    overflow: 'hidden',
  }),

  preview: style({ objectFit: 'cover' }),

  input: style({ display: 'none' }),

  label: style({ cursor: 'pointer' }),
};
