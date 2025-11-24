import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/api/client';
import { WelcomeSection as WelcomeSectionType } from '@/types';

interface Props {
  data: WelcomeSectionType | null;
}
const WelcomeSection = ({ data }: Props) => {
  const backgroundImage = data?.backgroundImage?.[0]; // Get first image from array
  const imageUrl = backgroundImage?.url 
    ? getStrapiImageUrl(backgroundImage.url)
    : '/images/placeholder.jpg'; // Fallback image

  return (
    <section className="relative h-[500px]"> {/* Adjust height as needed */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={backgroundImage?.alternativeText || "Welcome background"}
          fill
          className="object-cover"
          priority
        />
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {data?.title}
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl">
            {data?.subtitle}
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;