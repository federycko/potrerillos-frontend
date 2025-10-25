// Image data structure from Strapi
interface ImageData {
  data: {
    attributes: {
      url: string;
    };
  };
}

// Microsite attributes based on Strapi model
export interface MicrositeAttributes {
  name: string;
  slug: string;
  description: string;
  logo: ImageData;
  cover_image?: ImageData[];
  subscription_plan?: 'basico' | 'premium';
  theme_color?: string;
  contact_email: string;
  contact_phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  address?: string;
  location?: string;
  is_active?: boolean;
  featured?: boolean;
  custom_pages?: any;
}

// Microsite entity
export interface Microsite {
  id: number;
  attributes: MicrositeAttributes;
}

// Activity attributes (already partially defined in page.tsx)
export interface ActivityAttributes {
  name: string;
  slug: string;
  description: string;
  category?: 'deportes-agua' | 'montana' | 'aventura' | 'cultura' | 'pesca' | 'turismo';
  difficulty?: 'facil' | 'moderado' | 'dificil' | 'experto';
  duration?: number;
  price_from?: number;
  price_to?: number;
  location?: string;
  highlights?: any;
  included?: string;
  requirements?: string;
  published?: boolean;
  featured_image?: ImageData;
  gallery?: ImageData[];
}

// Activity entity
export interface Activity {
  id: number;
  attributes: ActivityAttributes;
}

// Other Strapi entities (placeholders for now)
export interface Accommodation {
  id: number;
  attributes: any;
}

export interface Event {
  id: number;
  attributes: any;
}

export interface Section {
  id: number;
  attributes: any;
}

export interface Banner {
  id: number;
  attributes: any;
}

// Strapi response types
export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}