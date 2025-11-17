import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('API Base URL:', API_URL);
console.log('STRAPI Base URL:', STRAPI_URL);
// Helper para construir URLs de imágenes
export const getStrapiImageUrl = (url: string | undefined): string => {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

// Helper para queries con populate
export const buildPopulateQuery = (fields: string[]): string => {
  return fields.map(field => `populate[${field}]=*`).join('&');
};

export default apiClient;
