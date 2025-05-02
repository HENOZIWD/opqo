import { style } from '@vanilla-extract/css';

export const finishTitleStyle = style({
  fontSize: '1.5rem',
  fontWeight: 400,
  textAlign: 'center',
});

export const welcomeMessageStyle = style({
  fontSize: '3rem',
  fontWeight: 900,
  marginTop: '1.5rem',
  textAlign: 'center',
});

export const linkListStyle = style({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '3rem',
  gap: '2rem',
  justifyContent: 'center',
});

export const verificationSectionStyle = style({
  'display': 'flex',
  'flexDirection': 'row',
  'gap': '1rem',
  'alignItems': 'center',

  '@media': { 'screen and (width < 40rem)': { flexDirection: 'column' } },
});

export const timerStyle = style({
  'display': 'flex',
  'width': '3rem',
  'fontWeight': 900,
  'flex': '0 0 3rem',
  'justifyContent': 'center',

  '@media': { 'screen and (width < 40rem)': { flex: 0 } },
});
