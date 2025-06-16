import { colorStyleVars } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

export const studioInfoSectionStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }),

  title: style({
    fontSize: '0.875rem',
    color: colorStyleVars.gray,
    fontWeight: 400,
  }),

  content: style({ wordBreak: 'break-all' }),
};
