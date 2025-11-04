import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css';
import { colorStyleVars } from './constants';

export const theme = createGlobalThemeContract(
  {
    color: {
      background: 'color-background',
      text: 'color-text',
      error: 'color-error',
      brand: 'color-brand',
      gray: 'color-gray',

      shadow: 'color-shadow',
      lightShadow: 'color-lightShadow',
      errorShadow: 'color-errorShadow',
    },
  },
  (value) => `theme-${value}`,
);

createGlobalTheme(':root', theme, {
  color: {
    background: colorStyleVars.white,
    text: colorStyleVars.black,
    error: colorStyleVars.red,
    brand: colorStyleVars.blue,
    gray: colorStyleVars.lightGray,

    shadow: colorStyleVars.blackShadow,
    lightShadow: colorStyleVars.lightGrayShadow,
    errorShadow: colorStyleVars.redShadow,
  },
});

createGlobalTheme('[data-theme="dark"]', theme, {
  color: {
    background: colorStyleVars.dark,
    text: colorStyleVars.white,
    error: colorStyleVars.red,
    brand: colorStyleVars.blue,
    gray: colorStyleVars.gray,

    shadow: colorStyleVars.whiteShadow,
    lightShadow: colorStyleVars.lightGrayShadow,
    errorShadow: colorStyleVars.redShadow,
  },
});
