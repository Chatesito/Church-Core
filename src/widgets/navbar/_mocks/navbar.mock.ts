import type { NavItem, NavbarProps } from '../model/types';

export const navItemsMock: NavItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    href: '/',
  },
  {
    id: 'events',
    label: 'Eventos',
    href: '/eventos',
  },
  {
    id: 'readings',
    label: 'Lecturas',
    href: '/lecturas',
  },
  {
    id: 'learn-more',
    label: 'Conoce Más',
    children: [
      {
        id: 'members',
        label: 'Miembros de la Iglesia',
        href: '/miembros',
      },
      {
        id: 'groups',
        label: 'Grupos Parroquiales',
        href: '/grupos',
      },
      {
        id: 'activities',
        label: 'Actividades Semanales',
        href: '/actividades',
      },
    ],
  },
];

export const navbarMock: NavbarProps = {
  churchName: 'Parroquia San Juan María Vianney',
  items: navItemsMock,
  currentPath: '/',
};
