import apiClient from './client';
import type {
  StrapiResponseCollection,
  StrapiEntity,
  Activity,
  Accommodation,
  Microsite,
  Event,
  Section,
  Banner,
  WelcomeSectionResponse
} from '../../types';

// Activities
export const getActivities = async (params?: {
  category?: string;
  difficulty?: string;
  limit?: number;
}): Promise<StrapiResponseCollection<Activity>> => {
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

    const { data } = await apiClient.get<StrapiResponseCollection<Activity>>(`/activities?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } } };
  }
};

export const getActivity = async (slug: string): Promise<StrapiEntity<Activity> | null> => {
  try {
    const { data } = await apiClient.get<StrapiResponseCollection<Activity>>(
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
}): Promise<StrapiResponseCollection<Accommodation>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    
    if (params?.type) {
      queryParams.append('filters[type][$eq]', params.type);
    }
    if (params?.limit) {
      queryParams.append('pagination[pageSize]', params.limit.toString());
    }

    const { data } = await apiClient.get<StrapiResponseCollection<Accommodation>>(`/accommodations?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } } };
  }
};

export const getAccommodation = async (slug: string): Promise<StrapiEntity<Accommodation> | null> => {
  try {
    const { data } = await apiClient.get<StrapiResponseCollection<Accommodation>>(
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
}): Promise<StrapiResponseCollection<Microsite>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    
    if (params?.featured) {
      queryParams.append('filters[featured][$eq]', 'true');
    }
    if (params?.limit) {
      queryParams.append('pagination[pageSize]', params.limit.toString());
    }

    const { data } = await apiClient.get<StrapiResponseCollection<Microsite>>(`/microsites?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching microsites:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } } };
  }
};

export const getMicrosite = async (slug: string): Promise<StrapiEntity<Microsite> | null> => {
  try {
    const { data } = await apiClient.get<StrapiResponseCollection<Microsite>>(
      `/microsites?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching microsite:', error);
    return null;
  }
};

// Events
export const getEvents = async (): Promise<StrapiResponseCollection<Event>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');

    const { data } = await apiClient.get<StrapiResponseCollection<Event>>(`/events?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } } };
  }
};

export const getEvent = async (slug: string): Promise<StrapiEntity<Event> | null> => {
  try {
    const { data } = await apiClient.get<StrapiResponseCollection<Event>>(
      `/events?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

// Sections
export const getSections = async (): Promise<StrapiResponseCollection<Section>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    queryParams.append('sort', 'order:asc');

    const { data } = await apiClient.get<StrapiResponseCollection<Section>>(`/sections?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching sections:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } } };
  }
};

// Banners
export const getBanners = async (): Promise<StrapiResponseCollection<Banner>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');

    const { data } = await apiClient.get<StrapiResponseCollection<Banner>>(`/banners?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } } };
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


// lib/api/welcome.ts




export async function getWelcomeSection(locale: string = 'es'): Promise<WelcomeSectionResponse | null> {
  try {
    const { data } = await apiClient.get<WelcomeSectionResponse>(
      `/welcome-section?locale=${locale}&populate[backgroundImage][fields][0]=url&populate[backgroundImage][fields][1]=alternativeText&populate[backgroundImage][fields][2]=width&populate[backgroundImage][fields][3]=height&populate[ctaButton]=*&populate[highlights]=*`
    );
    console.log('Welcome Section Data:', data);
    // Check if section is active
    if (data && data?.data?.active === false) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching welcome section:', error);
    return null;
  }
}