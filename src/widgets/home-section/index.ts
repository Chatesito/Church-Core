// Main orchestrator component
export { HomeSection } from './ui/HomeSection';

// Individual subcomponents (can be used separately if needed)
export { HeroSlider } from './ui/HeroSlider';
export { ChurchInfo } from './ui/ChurchInfo';
export { PhotoGallery } from './ui/PhotoGallery';
export { LocationMap } from './ui/LocationMap';

// Types
export type {
  HomeSectionData,
  Slide,
  ContactInfo,
  Schedule,
} from './model/types';

// Mock data
export { homeSectionMock } from './_mocks/home-section.mock';
