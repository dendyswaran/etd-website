import type { ImageMetadata } from 'astro';
import softwareCost from '../assets/articles/software-cost.png';
import spreadsheetToApp from '../assets/articles/spreadsheet-to-app.png';

export const articleIllustrations: Record<
  string,
  { image: ImageMetadata; alt: string; caption: string }
> = {
  'artikel/biaya-software-custom': {
    image: softwareCost,
    alt: 'Dua orang menyusun modul software, alur integrasi, jam, dan keping anggaran untuk menggambarkan faktor biaya pengembangan.',
    caption:
      'Ilustrasi: ruang lingkup, integrasi, dan waktu pengerjaan membentuk kebutuhan anggaran software.',
  },
  'artikel/kapan-beralih-dari-excel': {
    image: spreadsheetToApp,
    alt: 'Dua orang menata lembar spreadsheet menjadi satu ruang kerja aplikasi yang terhubung, menggambarkan perpindahan proses bisnis secara bertahap.',
    caption:
      'Ilustrasi: perpindahan dari spreadsheet ke aplikasi dimulai dengan menata alur kerja dan data.',
  },
};
