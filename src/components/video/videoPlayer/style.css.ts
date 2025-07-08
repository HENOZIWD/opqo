import { colorStyleVars } from '@/styles/constant';
import { style } from '@vanilla-extract/css';

export const videoPlayerStyle = {
  container: style({
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: 0,
    border: 'none',
    outline: 'none',
    background: colorStyleVars.black,
    color: colorStyleVars.white,
  }),

  mouseHidden: style({ cursor: 'none' }),

  title: style({
    position: 'absolute',
    top: 0,
    opacity: 1,
    width: '100%',
    transition: 'opacity 0.5s',
    fontSize: '1.25rem',
    padding: '1rem',
    background: `linear-gradient(to bottom, ${colorStyleVars.blackShadow}, transparent)`,
  }),

  panel: style({
    opacity: 1,
    transition: 'opacity 0.5s',
  }),

  hidden: style({ opacity: 0 }),

  video: style({
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }),

  spinner: style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }),
};
