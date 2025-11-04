import { theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const headerStyle = {
  container: style({
    position: 'fixed',
    zIndex: 9999,
    width: '100%',
    background: theme.color.background,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    borderBottom: `1px solid ${theme.color.lightShadow}`,
    height: '3.75rem',
  }),

  right: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  }),

  logo: style({
    fontSize: '1.5rem',
    padding: '1rem',
    fontWeight: 900,
  }),
};
