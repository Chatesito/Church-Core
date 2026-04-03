export interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface Schedule {
  label: string;
  times: string[];
}

export interface HomeSectionData {
  slides: Slide[];
  contact: ContactInfo;
  massSchedule: Schedule;
  officeHours: Schedule;
  galleryImages: string[];
  mapEmbedUrl: string;
}
