import { style } from '@vanilla-extract/css';

export const colorStyleVars = {
  white: '#f1f1f1',
  black: '#121223',
  gray: '#777777',
  lightGray: '#cccccc',
  red: '#dd4c4c',
  blue: '#567ace',

  blackShadow: '#12122380',
  redShadow: '#dd4c4c80',
  lightGrayShadow: '#cccccc80',
};

export const commonStyle = {
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
