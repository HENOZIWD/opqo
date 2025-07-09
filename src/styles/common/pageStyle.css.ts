import { style } from '@vanilla-extract/css';

export const pageStyle = {
  errorPage: style({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '3rem',
    alignItems: 'center',
    gap: '1.5rem',
  }),

  pageTitle: style({
    fontSize: '2rem',
    textAlign: 'center',
    margin: '4rem 0 3rem',
    fontWeight: 900,
  }),
};
