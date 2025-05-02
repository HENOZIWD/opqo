import { blueStyleVar, lightgrayShadowStyleVar, whiteStyleVar } from '@/app/common.css';
import { style } from '@vanilla-extract/css';

export const studioLayoutNavigationBarStyle = style({
  'position': 'fixed',
  'width': '17.5rem',
  'borderRight': `1px solid ${lightgrayShadowStyleVar}`,
  'height': '100%',
  'background': whiteStyleVar,

  '@media': {
    'screen and (width < 40rem)': {
      position: 'relative',
      width: '100%',
      height: 'auto',
      borderRight: 0,
      borderBottom: `1px solid ${lightgrayShadowStyleVar}`,
    },
  },
});

export const studioLayoutTitleStyle = style({
  padding: '1rem',
  fontSize: '1.125rem',
  fontWeight: 400,
});

export const studioLayoutMenuListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const studioLayoutMenuStyle = style({
  display: 'block',
  padding: '0.75rem 0 0.75rem 1rem',
  fontSize: '1.5rem',
});

export const studioLayoutCurrentStyle = style({
  'fontWeight': 700,
  'borderRight': `0.5rem solid ${blueStyleVar}`,

  '@media': {
    'screen and (width < 40rem)': {
      borderRight: 0,
      borderLeft: `0.5rem solid ${blueStyleVar}`,
    },
  },
});

export const studioLayoutContentStyle = style({
  'marginLeft': '17.5rem',

  '@media': { 'screen and (width < 40rem)': { marginLeft: 0 } },
});
