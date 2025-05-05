import { style } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './common.css';
import { calc } from '@vanilla-extract/css-utils';

export const mainLayoutStyle = {
  content: style({
    position: 'relative',
    marginTop: '3.75rem',
    height: calc('100%').subtract('3.75rem').toString(),
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
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
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
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        borderRight: 0,
        borderLeft: `0.5rem solid ${colorStyleVars.blue}`,
      },
    },
  }),

  content: style({
    'marginLeft': '17.5rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { marginLeft: 0 } },
  }),
};

export const authTopBarStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '1.5rem',
    alignItems: 'center',
  }),

  accountMenu: style({
    position: 'relative',
    width: '2rem',
    height: '2rem',
    padding: 0,
    outline: 0,
    border: 'none',
    cursor: 'pointer',
  }),

  menuContainer: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    position: 'absolute',
    padding: '1rem 0.5rem',
    top: '4rem',
    right: '2rem',
    borderRadius: '0.5rem',
    background: colorStyleVars.white,
    zIndex: 9999,
    width: '16rem',
    boxShadow: `0 0 1px 1px ${colorStyleVars.lightGray}`,
  }),

  channelInfo: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0 0.5rem',
  }),

  channelName: style({ fontWeight: 700 }),

  changeChannel: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: '0.875rem',
    color: colorStyleVars.blue,
  }),

  menuList: style({
    display: 'flex',
    flexDirection: 'column',
  }),

  menu: style({
    'display': 'flex',
    'height': '2.5rem',
    'alignItems': 'center',
    'padding': '0 0.5rem',
    'width': '100%',
    'fontSize': '0.875rem',

    ':hover': {
      background: colorStyleVars.lightGrayShadow,
      borderRadius: '0.375rem',
    },
  }),

  signout: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '0 0.5rem',
  }),
};

export const headerStyle = {
  container: style({
    position: 'fixed',
    zIndex: 9999,
    width: '100%',
    background: colorStyleVars.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    borderBottom: `1px solid ${colorStyleVars.lightGrayShadow}`,
  }),

  logo: style({
    fontSize: '1.5rem',
    padding: '1rem',
    fontWeight: 900,
  }),
};
