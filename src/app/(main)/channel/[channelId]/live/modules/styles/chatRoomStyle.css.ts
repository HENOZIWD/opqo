import { MEDIA_QUERY_THRESHOLD } from '@/styles/constants';
import { theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const chatRoomStyle = {
  container: style({
    'position': 'sticky',
    'top': 0,
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1rem',
    'padding': '1rem',
    'boxShadow': `-1px 0 8px -4px ${theme.color.shadow}`,
    'height': calc.subtract('100dvh', '3.75rem'),
    'width': '24rem',
    'flexShrink': 0,

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        position: 'fixed',
        top: 'auto',
        bottom: 0,
        width: calc.subtract('100%', '2rem'),
        height: calc('100dvh')
          .subtract(calc('100dvw').subtract('2rem').multiply(27).divide(64))
          .subtract('3.75rem')
          .toString(),
        padding: '1rem 0',
        boxShadow: 'none',
        background: theme.color.background,
      },
    },
  }),

  chatRoomConnecting: style({ textAlign: 'center' }),

  titleWrapper: style({
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        flexDirection: 'row-reverse',
        padding: '0 1rem',
      },
    },
  }),

  expandIconWrapper: style({
    'background': theme.color.background,
    'borderRadius': '0.25rem',
    'position': 'absolute',
    'top': '1rem',
    'right': '1rem',
    'boxShadow': `0 0 8px 4px ${theme.color.lightShadow}`,

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        top: 'auto',
        bottom: '2rem',
        right: '2rem',
        boxShadow: `0 0 8px 0 ${theme.color.shadow}`,
      },
    },
  }),

  expandIcon: style({
    width: '1.875rem',
    height: '1.875rem',
    padding: '0.375rem',
  }),

  foldIcon: style({
    width: '1rem',
    height: '1rem',
  }),

  chatRoomTitle: style({
    fontWeight: 900,
    fontSize: '1.25rem',
    textAlign: 'center',
    flexGrow: 1,
  }),

  chatRoom: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flexGrow: 1,
    overflowY: 'auto',
  }),

  message: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    wordBreak: 'break-all',
  }),

  name: style({
    fontWeight: 700,
    whiteSpace: 'nowrap',
  }),

  bottom: style({
    height: '2rem',
    width: '100%',
    flexShrink: 0,
  }),

  toBottomIcon: style({
    position: 'absolute',
    width: '2rem',
    height: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '1rem',
    borderRadius: '9999px',
    background: theme.color.lightShadow,
    padding: '0.25rem',
  }),

  inputLabel: style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  }),

  inputWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    alignItems: 'flex-start',
  }),

  input: style({ flexGrow: 1 }),

  hidden: style({ display: 'none' }),
};
