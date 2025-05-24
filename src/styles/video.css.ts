import { createVar, keyframes, style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './common.css';
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

export const videoListSkeletonStyle = {
  container: style({
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }),

  thumbnail: style({
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    background: colorStyleVars.lightGray,
    borderRadius: '0.5rem',
  }),

  text: style({
    width: '100%',
    height: '1.5rem',
    background: colorStyleVars.lightGray,
    borderRadius: '0.5rem',
  }),
};

const rotateKeyframes = keyframes({ '100%': { transform: 'rotate(360deg)' } });
const dashKeyframes = keyframes({
  '0%': {
    strokeDasharray: '1, 150',
    strokeDashoffset: 0,
  },

  '50%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: -35,
  },

  '100%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: -124,
  },
});

export const spinnerStyle = {
  container: style({
    animation: `${rotateKeyframes} 2s linear infinite`,
    width: '3rem',
    height: '3rem',
  }),

  path: style({
    stroke: colorStyleVars.blue,
    strokeLinecap: 'round',
    animation: `${dashKeyframes} 1.5s ease-in-out infinite`,
  }),

};

export const thumbnailStyle = {
  container: style({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: colorStyleVars.black,
  }),

  image: style({ objectFit: 'contain' }),
};

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

  duration: style({
    position: 'absolute',
    right: '0.75rem',
    bottom: '0.75rem',
    padding: '0.25rem',
    background: colorStyleVars.black,
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: colorStyleVars.white,
  }),

  infoSection: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '0.75rem',
  }),

  channelImage: style({
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
    flexDirection: 'column-reverse',
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

export const videoPageStyle = {
  video: style({
    width: '100%',
    aspectRatio: '64/27',
    left: 0,
  }),

  loadError: style({ margin: '1.5rem 2rem' }),
};

export const videoInfoStyle = {
  container: style({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1.5rem',
    'padding': '1.5rem 2rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: '1.5rem 0' } },
  }),

  title: style({
    fontSize: '1.5rem',
    fontWeight: 700,
  }),

  channelSection: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  }),

  channelImage: style({
    width: '4rem',
    height: '4rem',
  }),

  channelName: style({
    fontSize: '1.5rem',
    fontWeight: 700,
  }),

  description: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontSize: '1.125rem',
  }),
};
