import { style } from '@vanilla-extract/css';
import { colorStyleVars } from './common.css';

export const mainLayoutStyle = {
  content: style({
    position: 'relative',
    marginTop: '3.75rem',
    height: 'calc(100% - 3.75rem)',
    overflowY: 'auto',
  }),
};

export const studioLayoutStyle = {
  navigationBar: style({
    'position': 'fixed',
    'width': '17.5rem',
    'borderRight': `1px solid ${colorStyleVars.lightGrayShadow}`,
    'height': '100%',
    'background': colorStyleVars.white,

    '@media': {
      'screen and (width < 40rem)': {
        position: 'relative',
        width: '100%',
        height: 'auto',
        borderRight: 0,
        borderBottom: `1px solid ${colorStyleVars.lightGrayShadow}`,
      },
    },
  }),

  title: style({
    padding: '1rem',
    fontSize: '1.125rem',
    fontWeight: 400,
  }),

  menuList: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }),

  menu: style({
    display: 'block',
    padding: '0.75rem 0 0.75rem 1rem',
    fontSize: '1.5rem',
  }),

  currentMenu: style({
    'fontWeight': 700,
    'borderRight': `0.5rem solid ${colorStyleVars.blue}`,

    '@media': {
      'screen and (width < 40rem)': {
        borderRight: 0,
        borderLeft: `0.5rem solid ${colorStyleVars.blue}`,
      },
    },
  }),

  content: style({
    'marginLeft': '17.5rem',

    '@media': { 'screen and (width < 40rem)': { marginLeft: 0 } },
  }),
};
