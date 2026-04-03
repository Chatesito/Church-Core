export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface NavbarProps {
  churchName: string;
  items: NavItem[];
  currentPath?: string;
}
