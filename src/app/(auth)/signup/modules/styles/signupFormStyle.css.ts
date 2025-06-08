import { style } from '@vanilla-extract/css';

export const signupFormStyle = {
  finishTitle: style({
    fontSize: '1.5rem',
    fontWeight: 400,
    textAlign: 'center',
  }),

  welcomeMessage: style({
    fontSize: '3rem',
    fontWeight: 900,
    marginTop: '1.5rem',
    textAlign: 'center',
  }),

  linkList: style({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3rem',
    gap: '2rem',
    justifyContent: 'center',
  }),

  verificationSection: style({
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '1rem',
    'alignItems': 'center',

    '@media': { 'screen and (width < 40rem)': { flexDirection: 'column' } },
  }),

  timer: style({
    'display': 'flex',
    'width': '3rem',
    'fontWeight': 900,
    'flex': '0 0 3rem',
    'justifyContent': 'center',

    '@media': { 'screen and (width < 40rem)': { flex: 0 } },
  }),
};
