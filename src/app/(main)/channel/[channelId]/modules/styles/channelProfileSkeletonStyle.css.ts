import { colorStyleVars } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

export const channelProfileSkeletonStyle = {
  image: style({
    width: '9rem',
    height: '9rem',
    borderRadius: 9999,
    background: colorStyleVars.lightGray,
  }),

  text: style({
    width: '16rem',
    height: '2rem',
    borderRadius: '0.25rem',
    background: colorStyleVars.lightGray,
  }),
};
