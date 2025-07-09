import { createVar, style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './constants';
import { calc } from '@vanilla-extract/css-utils';

const videoCardPerRow = createVar();

export const videoListStyle = {
  section: style({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1.5rem',
    'margin': '1.5rem 2rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { margin: '1.5rem 0' } },
  }),

  title: style({
    fontSize: '1.5rem',
    fontWeight: 700,
  }),

  list: style({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1rem',
  }),

  fallback: style({ margin: '0 1rem' }),

  card: style({
    '@media': {
      'screen and (width < 36rem)': { vars: { [videoCardPerRow]: '1' } },
      'screen and (36rem <= width < 50rem)': { vars: { [videoCardPerRow]: '2' } },
      'screen and (50rem <= width < 73.5rem)': { vars: { [videoCardPerRow]: '3' } },
      'screen and (73.5rem <= width < 97rem)': { vars: { [videoCardPerRow]: '4' } },
      'screen and (97rem <= width)': { vars: { [videoCardPerRow]: '5' } },
    },

    'width': calc('100%')
      .subtract(calc(videoCardPerRow)
        .subtract(1)
        .multiply('1rem'))
      .divide(videoCardPerRow)
      .toString(),
  }),
};

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
