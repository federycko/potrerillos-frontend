export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponseSingle<T> {
  data: StrapiEntity<T>;
  meta: Record<string, unknown>;
}

export interface StrapiResponseCollection<T> {
  data: StrapiEntity<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Media {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: MediaFormat;
      small: MediaFormat;
      medium: MediaFormat;
      large: MediaFormat;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Activity {
  name: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  duration?: number | null;
  price_from?: number | null;
  price_to?: number | null;
  featured_image?: Media;
  gallery?: Media[];
  location?: string | null;
  highlights?: Record<string, unknown> | null;
  included?: string | null;
  requirements?: string | null;
  published?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Accommodation {
  name: string;
  slug: string;
  type: string;
  description: string; // Changed from any to string
  capacity?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  price_per_night?: number | null;
  price_weekend?: number | null;
  featured_image?: Media;
  gallery?: Media[];
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  location?: string | null;
  amenities?: string | null;
  published?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Microsite {
  title: string;
  slug: string;
  description: string;
  content: string;
  featured: boolean;
  image?: Media;
  images?: Media[];
  activities?: StrapiEntity<Activity>[];
  events?: StrapiEntity<Event>[];
  accommodations?: StrapiEntity<Accommodation>[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Event {
  title: string;
  slug: string;
  description: string;
  content: string;
  eventDate: string;
  location?: string | null;
  image?: Media;
  images?: Media[];
  published?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Section {
  title: string;
  slug: string;
  content: string;
  order: number;
  image?: Media;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Banner {
  title: string;
  description: string;
  imageUrl: string;
  link?: string | null;
  placement: string;
  priority: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}