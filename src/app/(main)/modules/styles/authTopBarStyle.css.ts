import { colorStyleVars } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

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
