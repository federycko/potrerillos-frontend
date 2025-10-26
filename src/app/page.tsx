// app/page.tsx
import { getActivities, getMicrosites } from '@/lib/api';
import { getStrapiImageUrl } from '@/lib/api/client';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mountain, MapPin, Clock, ArrowRight, Star, Info, Compass, Wind 
} from 'lucide-react';
import type { StrapiEntity, Activity, Microsite } from '@/types';

export const dynamic = 'force-dynamic';

// Helper components
function HeroSection() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Dique Potrerillos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Descubre <span className="text-emerald-400">Potrerillos</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Un oasis de naturaleza, deportes y tranquilidad en el corazón de Mendoza
        </p>
        <Link 
          href="#actividades" 
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Explorar Experiencias
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { number: "15m³/s", label: "Caudal del río" },
    { number: "10km²", label: "Espejo de agua" },
    { number: "20°C", label: "Temperatura media" },
    { number: "365", label: "Días de sol al año" },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
                {stat.number}
              </div>
              <div className="text-stone-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
              Bienvenidos a Potrerillos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-6">
              Donde la naturaleza encuentra su equilibrio
            </h2>
            <p className="text-lg text-stone-700 mb-6">
              Ubicado a solo 45 minutos de la ciudad de Mendoza, el dique Potrerillos es uno de los embalses más importantes de la región. Con sus aguas cristalinas, playas de arena fina y espectaculares paisajes serranos, ofrece un refugio perfecto para quienes buscan conectar con la naturaleza.
            </p>
            <p className="text-lg text-stone-700 mb-8">
              Desde deportes náuticos hasta senderismo en las sierras, pasando por observación de flora y fauna autóctona, nuestro destino promete experiencias únicas para toda la familia.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Wind className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-900">Clima Templado</h3>
                  <p className="text-stone-600 text-sm">Veranos agradables todo el año</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mountain className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-900">Sierras Andinas</h3>
                  <p className="text-stone-600 text-sm">Senderos para todos los niveles</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              Conoce más sobre nosotros
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/about-image.jpg"
              alt="Vista panorámica de Potrerillos"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  try {
    const [activitiesRes, micrositesRes] = await Promise.all([
      getActivities({ limit: 6 }),
      getMicrosites({ featured: true, limit: 3 }),
    ]);

    const activities: StrapiEntity<Activity>[] = activitiesRes.data || [];
    const microsites: StrapiEntity<Microsite>[] = micrositesRes.data || [];

    return (
      <div className="min-h-screen bg-stone-50">
        {/* Hero Full Height */}
        <HeroSection />

        {/* Stats Bar */}
        <StatsBar />

        {/* Sobre Potrerillos */}
        <AboutSection />

        {/* Actividades */}
        <section id="actividades" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
                Qué Hacer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-4">
                Experiencias en la Naturaleza
              </h2>
              <p className="text-xl text-stone-600 max-w-3xl">
                Descubre actividades diseñadas para conectar con la naturaleza y disfrutar de este paraíso mENDocino
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.slice(0, 6).map((activity) => (
                <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-56">
                    {activity.attributes.featured_image ? (
                      <Image
                        src={getStrapiImageUrl(activity.attributes.featured_image.attributes.url)}
                        alt={activity.attributes.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                    )}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold capitalize">
                      {activity.attributes.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-stone-900">{activity.attributes.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    
                    <p className="text-stone-600 mb-4 line-clamp-2">
                      {activity.attributes.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activity.attributes.duration && (
                        <div className="flex items-center gap-1 text-sm text-stone-600">
                          <Clock className="w-4 h-4" />
                          {activity.attributes.duration}hs
                        </div>
                      )}
                      {activity.attributes.location && (
                        <div className="flex items-center gap-1 text-sm text-stone-600">
                          <MapPin className="w-4 h-4" />
                          {activity.attributes.location}
                        </div>
                      )}
                      {activity.attributes.price_from && (
                        <div className="text-sm font-semibold text-emerald-700">
                          desde ${activity.attributes.price_from}
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      href={`/activities/${activity.attributes.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Ver Detalles
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/activities" 
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
              >
                Ver Todas las Actividades
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Micrositios Destacados */}
        <section className="py-20 bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
                Alojamientos & Experiencias
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-4">
                Micrositios Destacados
              </h2>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Descubre alojamientos, restaurantes y proveedores locales certificados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {microsites.slice(0, 3).map((microsite) => (
                <div key={microsite.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    {microsite.attributes.image ? (
                      <Image
                        src={getStrapiImageUrl(microsite.attributes.image.attributes.url)}
                        alt={microsite.attributes.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                    )}
                    {microsite.attributes.featured && (
                      <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Destacado
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{microsite.attributes.title}</h3>
                    <p className="text-stone-600 mb-4 line-clamp-2">
                      {microsite.attributes.description}
                    </p>
                    
                    <Link 
                      href={`/microsites/${microsite.attributes.slug}`}
                      className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold"
                    >
                      Ver Micrositio
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-emerald-700 to-teal-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para tu aventura?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto text-emerald-100">
              Descubre todas las actividades, alojamientos y experiencias que Potrerillos tiene para ofrecerte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/activities" 
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-stone-100 font-semibold py-4 px-8 rounded-full transition-colors"
              >
                Explorar Actividades
                <Compass className="w-5 h-5" />
              </Link>
              <Link 
                href="/microsites" 
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-full transition-colors"
              >
                Ver Micrositios
                <Info className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error loading homepage:", error);
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Oops! Algo salió mal</h2>
          <p className="text-stone-600 mb-6">No pudimos cargar el contenido principal.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }
}