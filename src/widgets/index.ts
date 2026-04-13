// Widgets barrel export - Single entry point for all ChurchCore widgets

// Top Bar Widget
export { TopBar } from './top-bar';
export type { TopBarData } from './top-bar';

// Navigation Widget
export { Navbar } from './navbar';
export type { NavItem, NavbarProps } from './navbar';

// Home Section Widget (composed of HeroSlider, ChurchInfo, PhotoGallery, LocationMap)
export { HomeSection } from './home-section';
export type { HomeSectionData, Slide, ContactInfo, Schedule } from './home-section';

// Footer Widget
export { Footer } from './footer';
export type { FooterData, SocialLink } from './footer';

// Daily Readings Book Widget
export * from './daily-readings-book';
