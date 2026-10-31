import type { ImageMetadata } from 'astro';
import softwareCost from '../assets/articles/software-cost.png';
import spreadsheetToApp from '../assets/articles/spreadsheet-to-app.png';

export const articleIllustrations: Record<
  string,
  { image: ImageMetadata; alt: string; caption: string }
> = {
  'artikel/biaya-software-custom': {
    image: softwareCost,
    alt: 'Two people arrange software modules, connected workflows, a clock, and budget tokens to illustrate development cost factors.',
    caption:
      'Illustration: scope, integration, and development time shape a software budget.',
  },
  'artikel/kapan-beralih-dari-excel': {
    image: spreadsheetToApp,
    alt: 'Two people organize spreadsheet sheets into a connected application workspace, illustrating a gradual transition of business processes.',
    caption:
      'Illustration: moving from spreadsheets to an application starts with organizing workflows and data.',
  },
};
