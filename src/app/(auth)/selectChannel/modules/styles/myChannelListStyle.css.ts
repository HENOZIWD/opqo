import { style } from '@vanilla-extract/css';

export const myChannelListStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '3rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),

  loadError: style({
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  }),

  empty: style({ fontSize: '1.5rem' }),
};
