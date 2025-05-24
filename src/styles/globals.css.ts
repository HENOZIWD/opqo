import { globalStyle } from '@vanilla-extract/css';
import { colorStyleVars, MEDIA_QUERY_THRESHOLD } from './common.css';

globalStyle('html, body', {
  height: '100%',
  minHeight: '100vh',
  maxWidth: '100vw',
  overflow: 'hidden',
});

globalStyle('body', {
  color: colorStyleVars.black,
  background: colorStyleVars.white,
  fontFamily: 'Arial, Helvetica, sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('*', {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
});

globalStyle('input, textarea, button', { fontFamily: 'inherit' });

globalStyle('ul', { listStyle: 'none' });

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('html', { '@media': { '(prefers-color-scheme: dark)': { colorScheme: 'dark' } } });

globalStyle('main', { '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { padding: '0 1rem 1rem' } } });

globalStyle('button', {
  position: 'relative',
  border: 'none',
  outline: 'none',
  padding: 0,
  margin: 0,
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
});
