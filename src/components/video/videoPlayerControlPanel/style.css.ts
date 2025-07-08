import { colorStyleVars } from '@/styles/constant';
import { style } from '@vanilla-extract/css';

export const videoPlayerControlPanelStyle = {
  container: style({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: `linear-gradient(to top, ${colorStyleVars.blackShadow}, transparent)`,
  }),

  panel: style({
    padding: '0.5rem 1rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  }),

  playPauseButton: style({
    width: '2rem',
    height: '2rem',
  }),

  volumeButton: style({
    width: '1.25rem',
    height: '1.25rem',
  }),

  volumeSlider: style({ width: '6rem' }),

  rightSection: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
    marginLeft: 'auto',
  }),

  resolutionButton: style({ color: colorStyleVars.white }),

  resolutionList: style({
    display: 'flex',
    flexDirection: 'column',
    background: colorStyleVars.gray,
  }),

  resolutionItem: style({
    'color': colorStyleVars.white,
    'padding': '1rem',
    'width': '100%',
    'textAlign': 'left',

    ':hover': { background: colorStyleVars.blackShadow },
  }),

  fullscreenButton: style({
    width: '1.75rem',
    height: '1.75rem',
  }),
};
