import apiClient from './client';
import type {
  StrapiResponse,
  StrapiEntity,
  Activity,
  Accommodation,
  Microsite,
  Event,
  Section,
  Banner,
} from '@/types';

// Activities
export const getActivities = async (params?: {
  category?: string;
  difficulty?: string;
  limit?: number;
}): Promise<StrapiResponse<StrapiEntity<Activity>[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    
    if (params?.category) {
      queryParams.append('filters[category][$eq]', params.category);
    }
    if (params?.difficulty) {
      queryParams.append('filters[difficulty][$eq]', params.difficulty);
    }
    if (params?.limit) {
      queryParams.append('pagination[pageSize]', params.limit.toString());
    }

    const { data } = await apiClient.get(`/activities?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return { data: [], meta: {} };
  }
};

export const getActivity = async (slug: string): Promise<StrapiEntity<Activity> | null> => {
  try {
    const { data } = await apiClient.get(
      `/activities?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
};

// Accommodations
export const getAccommodations = async (params?: {
  type?: string;
  limit?: number;
}): Promise<StrapiResponse<StrapiEntity<Accommodation>[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    
    if (params?.type) {
      queryParams.append('filters[type][$eq]', params.type);
    }
    if (params?.limit) {
      queryParams.append('pagination[pageSize]', params.limit.toString());
    }

    const { data } = await apiClient.get(`/accommodations?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return { data: [], meta: {} };
  }
};

export const getAccommodation = async (slug: string): Promise<StrapiEntity<Accommodation> | null> => {
  try {
    const { data } = await apiClient.get(
      `/accommodations?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching accommodation:', error);
    return null;
  }
};

// Microsites
export const getMicrosites = async (params?: {
  featured?: boolean;
  limit?: number;
}): Promise<StrapiResponse<StrapiEntity<Microsite>[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    
    if (params?.featured) {
      queryParams.append('filters[featured][$eq]', 'true');
    }
    if (params?.limit) {
      queryParams.append('pagination[pageSize]', params.limit.toString());
    }

    const { data } = await apiClient.get(`/microsites?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching microsites:', error);
    return { data: [], meta: {} };
  }
};

export const getMicrosite = async (slug: string): Promise<StrapiEntity<Microsite> | null> => {
  try {
    const { data } = await apiClient.get(
      `/microsites?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching microsite:', error);
    return null;
  }
};

// Events
export const getEvents = async (params?: {
  upcoming?: boolean;
  limit?: number;
}): Promise<StrapiResponse<StrapiEntity<Event>[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    
    if (params?.upcoming) {
      const now = new Date().toISOString();
      queryParams.append('filters[event_date][$gte]', now);
      queryParams.append('sort', 'event_date:asc');
    }
    if (params?.limit) {
      queryParams.append('pagination[pageSize]', params.limit.toString());
    }

    const { data } = await apiClient.get(`/events?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return { data: [], meta: {} };
  }
};

export const getEvent = async (slug: string): Promise<StrapiEntity<Event> | null> => {
  try {
    const { data } = await apiClient.get(
      `/events?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

// Sections
export const getSections = async (): Promise<StrapiResponse<StrapiEntity<Section>[]>> => {
  try {
    const { data } = await apiClient.get('/sections?populate=*&sort=order:asc');
    return data;
  } catch (error) {
    console.error('Error fetching sections:', error);
    return { data: [], meta: {} };
  }
};

export const getSection = async (slug: string): Promise<StrapiEntity<Section> | null> => {
  try {
    const { data } = await apiClient.get(
      `/sections?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching section:', error);
    return null;
  }
};

// Banners
export const getBanners = async (placement?: string): Promise<StrapiResponse<StrapiEntity<Banner>[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    queryParams.append('filters[is_active][$eq]', 'true');
    
    const now = new Date().toISOString();
    queryParams.append('filters[start_date][$lte]', now);
    queryParams.append('filters[end_date][$gte]', now);
    
    if (placement) {
      queryParams.append('filters[placement][$eq]', placement);
    }
    
    queryParams.append('sort', 'priority:desc');

    const { data } = await apiClient.get(`/banners?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return { data: [], meta: {} };
  }
};

// Information (Single Type)
export const getInformation = async () => {
  try {
    const { data } = await apiClient.get('/information?populate=*');
    return data.data?.attributes || null;
  } catch (error) {
    console.error('Error fetching information:', error);
    return null;
  }
};
