'use client';

import { HeroSlider } from './HeroSlider';
import { ChurchInfo } from './ChurchInfo';
import { PhotoGallery } from './PhotoGallery';
import { LocationMap } from './LocationMap';
import { homeSectionMock } from '../_mocks/home-section.mock';

export function HomeSection() {
  const data = homeSectionMock;

  return (
    <main>
      {/* Hero Slider */}
      <HeroSlider slides={data.slides} />

      {/* Church Info + Photo Gallery - Same Row */}
      <section className="bg-surface py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Church Info */}
          <div>
            <ChurchInfo
              contact={data.contact}
              massSchedule={data.massSchedule}
              officeHours={data.officeHours}
            />
          </div>
          {/* Right: Photo Gallery */}
          <div className="min-h-[400px]">
            <PhotoGallery images={data.galleryImages} />
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="bg-surface py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <LocationMap embedUrl={data.mapEmbedUrl} />
        </div>
      </section>
    </main>
  );
}
