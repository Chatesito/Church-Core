import type { FooterData } from '../model/types';

export const footerMock: FooterData = {
  churchName: 'Parroquia San Juan María Vianney',
  tagline: 'Una comunidad de fe, esperanza y amor en el corazón de Neiva.',
  contact: {
    address: 'Carrera 5 # 12-34, Neiva, Huila',
    phone: '(608) 871-2345',
    email: 'parroquia@sjmvianney.org',
  },
  socials: [
    {
      platform: 'facebook',
      url: 'https://facebook.com',
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com',
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com',
    },
  ],
  copyright: '© 2025 Parroquia San Juan María Vianney - Neiva. Todos los derechos reservados.',
  livestreamNote: 'Transmisiones en vivo de nuestras Misas todos los domingos a las 11:00 AM',
};
