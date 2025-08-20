import { colorStyleVars } from '@/styles/constants';
import { style } from '@vanilla-extract/css';

export const commentStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '1rem',
  }),

  channelImage: style({
    width: '2rem',
    height: '2rem',
    flexShrink: 0,
  }),

  commentWrapper: style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    flexGrow: 1,
  }),

  channelName: style({
    fontWeight: 900,
    fontSize: '1rem',
  }),

  comment: style({
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
  }),

  createdDate: style({
    fontSize: '0.875rem',
    color: colorStyleVars.gray,
  }),

  deleteButton: style({
    'display': 'flex',
    'padding': '0.5rem',
    'borderRadius': 9999,

    ':hover': { backgroundColor: colorStyleVars.lightGrayShadow },
  }),
};
