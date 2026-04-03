export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube';
  url: string;
}

export interface FooterData {
  churchName: string;
  tagline: string;
  contact: ContactInfo;
  socials: SocialLink[];
  copyright: string;
  livestreamNote?: string;
}
