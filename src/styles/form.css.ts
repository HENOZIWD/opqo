import { style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './common.css';

const formContainerStyle = style({
  'width': '33rem',
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '1rem',
  'margin': '0 auto 1rem',

  '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { width: '100%' } },
});

export const formStyle = {
  container: formContainerStyle,

  error: style({
    'color': colorStyleVars.red,

    '::before': {
      content: '•',
      paddingRight: '0.5rem',
    },
  }),

  submit: style({
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'flex-end',
  }),
};

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

export const signupFormStyle = {
  finishTitle: style({
    fontSize: '1.5rem',
    fontWeight: 400,
    textAlign: 'center',
  }),

  welcomeMessage: style({
    fontSize: '3rem',
    fontWeight: 900,
    marginTop: '1.5rem',
    textAlign: 'center',
  }),

  linkList: style({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3rem',
    gap: '2rem',
    justifyContent: 'center',
  }),

  verificationSection: style({
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '1rem',
    'alignItems': 'center',

    '@media': { 'screen and (width < 40rem)': { flexDirection: 'column' } },
  }),

  timer: style({
    'display': 'flex',
    'width': '3rem',
    'fontWeight': 900,
    'flex': '0 0 3rem',
    'justifyContent': 'center',

    '@media': { 'screen and (width < 40rem)': { flex: 0 } },
  }),
};

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
