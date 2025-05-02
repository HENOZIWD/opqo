import { createGlobalVar, createVar, style } from '@vanilla-extract/css';

// const white = createGlobalVar('white');
// const black = createGlobalVar('black');
// const gray = createGlobalVar('gray');
// const lightgray = createGlobalVar('lightgray');
const red = createGlobalVar('red');
// const blue = createGlobalVar('blue');
// const blackShadow = createGlobalVar('black-shadow');
// const redShadow = createGlobalVar('red-shadow');
// const lightgrayShadow = createGlobalVar('lightgray-shadow');

export const pageTitleStyle = style({
  fontSize: '2rem',
  textAlign: 'center',
  margin: '4rem 0 3rem',
  fontWeight: 900,
});

export const videoSectionStyle = style({
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '1.5rem',
  'margin': '1.5rem 2rem',

  '@media': { 'screen and (width < 40rem)': { margin: '1.5rem 0' } },
});

export const videoSectionTitleStyle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
});

export const videoListStyle = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '1rem',
});

const videoCardPerRow = createVar();

export const videoCardStyle = style({
  '@media': {
    'screen and (width < 36rem)': { vars: { [videoCardPerRow]: '1' } },
    'screen and (36rem <= width < 50rem)': { vars: { [videoCardPerRow]: '2' } },
    'screen and (50rem <= width < 73.5rem)': { vars: { [videoCardPerRow]: '3' } },
    'screen and (73.5rem <= width < 97rem)': { vars: { [videoCardPerRow]: '4' } },
    'screen and (97rem <= width)': { vars: { [videoCardPerRow]: '5' } },
  },

  'width': `calc((100% - ((${videoCardPerRow} - 1) * 1rem)) / ${videoCardPerRow})`,
});

export const formStyle = style({
  'width': '33rem',
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '1rem',
  'margin': '0 auto 1rem',

  '@media': { 'screen and (width < 40rem)': { width: '100%' } },
});

export const formErrorStyle = style({
  'color': red,
  '::before': {
    content: '•',
    paddingRight: '0.5rem',
  },
});

export const formSubmitStyle = style({
  display: 'flex',
  marginTop: '1rem',
  justifyContent: 'flex-end',
});
