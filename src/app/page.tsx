// app/page.tsx
import { getActivities, getMicrosites, getEvents, getBanners } from '@/lib/api';
import { getStrapiImageUrl } from '@/lib/api/client';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mountain, MapPin, Clock, Users, ArrowRight, Star, Info, Compass, Wind 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    // Nota: getBanners está importado pero no usado en la versión original.
    // Si decides usarlo en HeroSection, descomenta la línea de abajo.
    const [activitiesRes, micrositesRes, bannersRes] = await Promise.all([
      getActivities({ limit: 6 }),
      getMicrosites({ featured: true, limit: 3 }),
      getBanners('home-hero'),
    ]);

    const activities = activitiesRes.data || [];
    const microsites = micrositesRes.data || [];
    const banners = bannersRes?.data || [];

    return (
      <div className="min-h-screen bg-stone-50">
        {/* Hero Full Height */}
        <HeroSection banner={banners[0]} />

        {/* Stats Bar */}
        <StatsBar />

        {/* Sobre Potrerillos */}
        <AboutSection />

        {/* Actividades */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
                Qué Hacer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-4">
                Experiencias en la Naturaleza
              </h2>
              <p className="text-xl text-stone-600 max-w-3xl">
                Desde deportes acuáticos hasta trekking de montaña, descubre todas las actividades que Potrerillos tiene para ofrecerte
              </p>
            </div>

            {activities.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {activities.map((activity: Activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
                <div className="text-center">
                  <Link
                    href="/actividades"
                    className="inline-flex items-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-none hover:bg-emerald-800 transition-all font-medium text-lg"
                  >
                    Ver Todas las Actividades
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-lg">
                <Compass className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                <p className="text-stone-600 text-lg">
                  Próximamente más actividades disponibles
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Clima y Mejor Época */}
        <ClimateSection />

        {/* Emprendimientos */}
        {microsites.length > 0 && (
          <section className="py-20 bg-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
                  Servicios Locales
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-4">
                  Emprendimientos de la Zona
                </h2>
                <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                  Conoce los emprendimientos locales que te ayudarán a vivir la mejor experiencia
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {microsites.map((microsite: Microsite) => (
                  <MicrositeCard key={microsite.id} microsite={microsite} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Información Práctica */}
        <PracticalInfoSection />

        {/* CTA Final */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/pattern-topo.svg')] bg-repeat opacity-30"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <Mountain className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tu Aventura Comienza Aquí
            </h2>
            <p className="text-xl mb-12 text-stone-300 max-w-2xl mx-auto">
              A solo 60 km de Mendoza, descubre un paraíso natural donde la montaña se encuentra con el agua
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/actividades"
                className="bg-emerald-600 text-white px-10 py-4 rounded-none hover:bg-emerald-700 transition-all font-semibold text-lg"
              >
                Explorar Actividades
              </Link>
              <Link
                href="/informacion"
                className="bg-white bg-opacity-10 backdrop-blur-sm text-white px-10 py-4 rounded-none hover:bg-opacity-20 transition-all font-semibold text-lg border-2 border-white"
              >
                Información Práctica
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading home data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <Mountain className="w-16 h-16 text-stone-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-stone-900 mb-4">
            Error al cargar el contenido
          </h1>
          <p className="text-stone-600">
            Por favor, intenta nuevamente más tarde
          </p>
        </div>
      </div>
    );
  }
}

// =============== TYPES ===============
interface ImageData {
  data: {
    attributes: {
      url: string;
    };
  };
}

interface ActivityAttributes {
  name: string;
  slug: string;
  description: string;
  category?: 'deportes-agua' | 'montana' | 'aventura' | 'cultura' | 'pesca' | 'turismo';
  difficulty?: 'facil' | 'moderado' | 'dificil' | 'experto';
  duration?: number;
  price_from?: number;
  price_to?: number;
  location?: string;
  highlights?: Array<{ title: string; description: string }> | null;
  included?: string;
  requirements?: string;
  published?: boolean;
  featured_image?: ImageData;
  gallery?: ImageData[];
}

interface Activity {
  id: number;
  attributes: ActivityAttributes;
}

interface MicrositeAttributes {
  name: string;
  slug: string;
  description: string;
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
  custom_pages?: Array<{ title: string; content: string }> | null;
  logo?: ImageData;
  cover_image?: ImageData[];
}

interface Microsite {
  id: number;
  attributes: MicrositeAttributes;
}

// =============== COMPONENTES ===============

function HeroSection({ banner }: { banner?: any }) {
  return (
    <div className="relative h-screen min-h-[700px]">
      <div className="absolute inset-0 bg-stone-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/hero-potrerillos.jpg')` }}
        />
      </div>

      <div className="relative z-20 h-full flex flex-col justify-end pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-600 bg-opacity-90 text-white px-4 py-2 rounded-none mb-6 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Mendoza, Argentina
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Dique<br />Potrerillos
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 mb-8 leading-relaxed">
              Un paraíso natural de montañas, aguas cristalinas y aventuras sin límites a 1.385 metros sobre el nivel del mar
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#actividades"
                className="bg-white text-stone-900 px-8 py-4 rounded-none hover:bg-stone-100 transition-all font-semibold"
              >
                Descubrir
              </Link>
              <Link
                href="/informacion"
                className="bg-transparent text-white px-8 py-4 rounded-none hover:bg-white hover:bg-opacity-10 transition-all font-semibold border-2 border-white"
              >
                Cómo Llegar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-white animate-bounce">
          <span className="text-sm font-medium">Explorar</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { icon: Mountain, value: '2.850m', label: 'Altura Máxima' },
    { icon: Wind, value: '15-30 km/h', label: 'Vientos Ideales' },
    { icon: MapPin, value: '60 km', label: 'de Mendoza' },
    { icon: Users, value: '1.300 ha', label: 'Superficie' },
  ];

  return (
    <div className="bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center">
                <Icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-stone-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-stone-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
              Sobre el Dique
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-6">
              Un Destino Único en los Andes
            </h2>
            <div className="space-y-4 text-lg text-stone-700 leading-relaxed">
              <p>
                El Dique Potrerillos se encuentra en el corazón de la precordillera mendocina, rodeado de paisajes de montaña que quitan el aliento.
              </p>
              <p>
                Construido sobre el río Mendoza, este embalse artificial de 365 millones de m³ se ha convertido en un centro de deportes de aventura y turismo de naturaleza de clase mundial.
              </p>
              <p>
                Sus vientos constantes lo han posicionado como uno de los mejores spots de Sudamérica para kitesurf y windsurf, mientras que sus aguas cristalinas y montañas circundantes ofrecen infinitas posibilidades para el trekking y la exploración.
              </p>
            </div>
            <Link
              href="/informacion"
              className="inline-flex items-center gap-2 mt-8 text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              <Info className="w-5 h-5" />
              Conocer más sobre el dique
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-stone-300 rounded-sm overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-stone-200"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl max-w-xs">
              <div className="text-4xl font-bold text-emerald-700 mb-1">1999-2003</div>
              <div className="text-stone-600">Años de construcción del dique moderno</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClimateSection() {
  const seasons = [
    {
      name: 'Verano',
      months: 'Dic - Mar',
      temp: '25-35°C',
      description: 'Ideal para deportes acuáticos',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Otoño',
      months: 'Abr - Jun',
      temp: '15-25°C',
      description: 'Perfecto para trekking',
      color: 'from-orange-600 to-red-600',
    },
    {
      name: 'Invierno',
      months: 'Jul - Sep',
      temp: '10-18°C',
      description: 'Paisajes nevados únicos',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Primavera',
      months: 'Oct - Nov',
      temp: '20-28°C',
      description: 'Flora en su máximo esplendor',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
            Planifica tu Visita
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-4">
            Mejor Época para Visitar
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Potrerillos ofrece experiencias únicas durante todo el año
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {seasons.map((season) => (
            <div key={season.name} className="bg-white p-6 rounded-sm shadow-md hover:shadow-xl transition-shadow">
              <div className={`w-full h-2 bg-gradient-to-r ${season.color} rounded-full mb-4`}></div>
              <h3 className="text-2xl font-bold text-stone-900 mb-1">{season.name}</h3>
              <div className="text-sm text-stone-500 mb-3">{season.months}</div>
              <div className="text-3xl font-bold text-emerald-700 mb-3">{season.temp}</div>
              <p className="text-stone-600">{season.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticalInfoSection() {
  const info = [
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Ruta 82, Km 60 - Luján de Cuyo, Mendoza',
    },
    {
      icon: Clock,
      title: 'Distancia',
      content: '60 km desde Mendoza Capital (1 hora en auto)',
    },
    {
      icon: Info,
      title: 'Altitud',
      content: '1.385 metros sobre el nivel del mar',
    },
  ];

  return (
    <section className="py-20 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {info.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-700 rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-emerald-100">{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const { attributes } = activity;
  const imageUrl = attributes?.featured_image?.data
    ? getStrapiImageUrl(attributes.featured_image.data.attributes.url)
    : null;

  const difficultyColors = {
    facil: 'bg-green-100 text-green-800 border-green-300',
    moderado: 'bg-amber-100 text-amber-800 border-amber-300',
    dificil: 'bg-orange-100 text-orange-800 border-orange-300',
    experto: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <Link href={`/actividades/${attributes?.slug}`} className="group">
      <div className="bg-white rounded-none shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div className="relative h-64 overflow-hidden bg-stone-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={attributes.name || 'Actividad'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-stone-200" />
          )}
          {attributes?.difficulty && (
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-none text-xs font-bold border-2 ${difficultyColors[attributes.difficulty as keyof typeof difficultyColors]}`}>
                {attributes.difficulty.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">
            {attributes?.name}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-stone-600 mb-4">
            {attributes?.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {attributes.duration}h
              </span>
            )}
            {attributes?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {attributes.location}
              </span>
            )}
          </div>

          {attributes?.price_from !== undefined && (
            <div className="text-2xl font-bold text-emerald-700">
              ${attributes.price_from.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function MicrositeCard({ microsite }: { microsite: Microsite }) {
  const { attributes } = microsite;
  
  return (
    <Link href={`/emprendimientos/${attributes.slug}`} className="block h-full">
      <div className="bg-white rounded-none shadow-md overflow-hidden hover:shadow-2xl transition-all p-8 text-center h-full flex flex-col justify-between">
        <div>
          <div className="w-24 h-24 bg-stone-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Mountain className="w-12 h-12 text-emerald-700" />
          </div>
          <h3 className="text-2xl font-bold text-stone-900 mb-3">
            {attributes.name}
          </h3>
          {attributes.subscription_plan === 'premium' && (
            <span className="inline-flex items-center gap-1 px-4 py-1 bg-amber-100 text-amber-800 rounded-none text-sm font-bold mb-4 border-2 border-amber-300">
              <Star className="w-4 h-4" />
              PREMIUM
            </span>
          )}
        </div>
        <span className="text-emerald-700 font-semibold hover:underline flex items-center justify-center gap-2 mt-4">
          Conocer más
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}