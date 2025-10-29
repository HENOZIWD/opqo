import { theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const channelProfileSkeletonStyle = {
  image: style({
    width: '9rem',
    height: '9rem',
    borderRadius: 9999,
    background: theme.color.gray,
  }),

  text: style({
    width: '16rem',
    height: '2rem',
    borderRadius: '0.25rem',
    background: theme.color.gray,
  }),
};
