import { style } from '@vanilla-extract/css';
import { colorStyleVars } from '../constants';

export const videoCardStyle = {
  container: style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '0.75rem',
  }),

  thumbnail: style({
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: colorStyleVars.black,
    borderRadius: '0.5rem',
    overflow: 'hidden',
  }),

  infoSection: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '0.75rem',
  }),

  channelImage: style({
    flexShrink: 0,
    width: '2.5rem',
    height: '2.5rem',
  }),

  info: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.875rem',
  }),

  title: style({
    fontWeight: 700,
    fontSize: '1rem',
  }),

  channelName: style({ fontWeight: 900 }),
};
