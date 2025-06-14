import { style } from '@vanilla-extract/css';
import { studioInfoSectionStyle } from '../../../modules/styles/studioInfoSectionStyle.css';
import { MEDIA_QUERY_THRESHOLD } from '@/styles/common.css';

export const editableStudioInfoSectionStyle = {
  container: studioInfoSectionStyle.container,
  title: studioInfoSectionStyle.title,

  content: style({
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '0.5rem',
    'alignItems': 'center',

    '@media': {
      [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: {
        flexDirection: 'column',
        alignItems: 'normal',
      },
    },
  }),

  input: style({
    'width': '24rem',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { width: '100%' } },
  }),

  editButtonSet: style({
    'display': 'flex',
    'flexDirection': 'row',
    'gap': '0.5rem',
    'alignSelf': 'stretch',
    'alignItems': 'flex-end',

    '@media': { [`screen and (width < ${MEDIA_QUERY_THRESHOLD})`]: { justifyContent: 'space-between' } },
  }),
};
