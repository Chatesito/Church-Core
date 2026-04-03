import type { HomeSectionData } from '../model/types';

export const homeSectionMock: HomeSectionData = {
  slides: [
    {
      id: 'slide-1',
      imageUrl:
        'https://images.unsplash.com/photo-1608569569089-5d2e3e644ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTE0ODcxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Bienvenidos a Nuestra Parroquia',
      subtitle: 'Un lugar de fe, esperanza y amor',
    },
    {
      id: 'slide-2',
      imageUrl:
        'https://images.unsplash.com/photo-1631656773931-dda2e0c51b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGFsdGFyfGVufDF8fHx8MTc2NTE1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Celebremos Juntos',
      subtitle: 'Te esperamos en nuestras celebraciones',
    },
    {
      id: 'slide-3',
      imageUrl:
        'https://images.unsplash.com/photo-1761640864240-f793d7ec8348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZ2lvdXMlMjBjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzY1MjE5ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Somos Comunidad',
      subtitle: 'Unidos en Cristo, crecemos en fe',
    },
  ],
  contact: {
    address: 'Carrera 5 # 12-34, Neiva, Huila',
    phone: '(608) 871-2345',
    email: 'parroquia@sjmvianney.org',
  },
  massSchedule: {
    label: 'Horarios de Misa',
    times: [
      'Lunes a Viernes: 6:00 AM y 6:00 PM',
      'Sábados: 6:00 AM y 6:00 PM',
      'Domingos: 7:00 AM, 9:00 AM, 11:00 AM y 6:00 PM',
    ],
  },
  officeHours: {
    label: 'Horario de Oficina',
    times: [
      'Lunes a Viernes: 8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM',
      'Sábados: 8:00 AM - 12:00 PM',
    ],
  },
  galleryImages: [
    'https://images.unsplash.com/photo-1608569569089-5d2e3e644ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTE0ODcxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1631656773931-dda2e0c51b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGFsdGFyfGVufDF8fHx8MTc2NTE1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1761640864240-f793d7ec8348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZ2lvdXMlMjBjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzY1MjE5ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1638722843611-425345688b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHJlYWRpbmclMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzY1MjE5ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  ],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.1234567890!2d-75.28!3d2.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTUnNDguMCJOIDc1wrAxNic0OC4wIlc!5e0!3m2!1ses!2sco!4v1234567890',
};
