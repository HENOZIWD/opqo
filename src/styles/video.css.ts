import { createVar, style } from '@vanilla-extract/css';

const videoCardPerRow = createVar();

export const videoStyle = {
  listSection: style({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1.5rem',
    'margin': '1.5rem 2rem',

    '@media': { 'screen and (width < 40rem)': { margin: '1.5rem 0' } },
  }),

  listSectionTitle: style({
    fontSize: '1.5rem',
    fontWeight: 700,
  }),

  list: style({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1rem',
  }),

  card: style({
    '@media': {
      'screen and (width < 36rem)': { vars: { [videoCardPerRow]: '1' } },
      'screen and (36rem <= width < 50rem)': { vars: { [videoCardPerRow]: '2' } },
      'screen and (50rem <= width < 73.5rem)': { vars: { [videoCardPerRow]: '3' } },
      'screen and (73.5rem <= width < 97rem)': { vars: { [videoCardPerRow]: '4' } },
      'screen and (97rem <= width)': { vars: { [videoCardPerRow]: '5' } },
    },

    'width': `calc((100% - ((${videoCardPerRow} - 1) * 1rem)) / ${videoCardPerRow})`,
  }),
};
