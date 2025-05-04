import { style } from '@vanilla-extract/css';
import { colorStyleVars } from './common.css';

const infoCategoryStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const infoCategoryTitleStyle = style({
  fontSize: '0.875rem',
  color: colorStyleVars.gray,
  fontWeight: 400,
});

export const myVideoInfoStyle = {
  container: style({ padding: '0 2rem 2rem' }),

  thumbnail: style({
    width: '24rem',
    aspectRatio: '16/9',
    background: colorStyleVars.black,
    borderRadius: '0.5rem',
    overflow: 'hidden',
  }),

  info: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
  }),

  title: style({
    fontWeight: 700,
    fontSize: '1.25rem',
  }),

  category: infoCategoryStyle,

  categoryTitle: infoCategoryTitleStyle,
};

export const studioContentCardStyle = {
  info: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
  }),
};

export const studioInfoStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    paddingTop: '1.5rem',
    alignItems: 'center',
  }),

  channelImage: style({
    width: '8rem',
    height: '8rem',
  }),

  channelName: style({
    fontSize: '1.75rem',
    fontWeight: 700,
  }),

  category: style([infoCategoryStyle, { alignItems: 'center' }]),

  categoryTitle: infoCategoryTitleStyle,

  categoryContent: style({ fontSize: '1.25rem' }),

  loadError: style({ textAlign: 'center' }),
};
