import { colorStyleVars } from '@/styles/common.css';
import { style } from '@vanilla-extract/css';

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
