import { getActivities, getMicrosites, getEvents, getBanners, getWelcomeSection } from '@/lib/api';
import { getStrapiImageUrl } from '@/lib/api/client';
import Image from 'next/image';
import Link from 'next/link';
import WelcomeSection  from '@/components/WelcomeSection';
import { Mountain, MapPin, Clock, DollarSign, Calendar, ArrowRight, Star } from 'lucide-react';
import { Activity, Microsite, StrapiEntity, Event, Banner } from '@/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data en paralelo
  try {
    const [activitiesRes, micrositesRes, eventsRes, bannersRes, welcomeRes] = await Promise.all([
      getActivities({ limit: 6 }),
      getMicrosites({ featured: true, limit: 3 }),
      getEvents(),
      getBanners(),
      getWelcomeSection(),
    ]);

    const activities = activitiesRes.data || [];
    
    const microsites = micrositesRes.data || [];
    const events = eventsRes.data || [];
    const banners = bannersRes.data || [];
    const welcome = welcomeRes?.data || null;
    console.log(welcomeRes);
    console.log(activities)

    return (
      <div className="min-h-screen">
        {/* <HeroSection banner={banners[0]} /> */}

        {welcome && welcome?.active && <WelcomeSection data={welcome} />}
        
        <QuickSearch />
        
        {/* Actividades */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Actividades Destacadas
              </h2>
              <p className="text-xl text-gray-600">
                Descubre las mejores experiencias en Potrerillos
              </p>
            </div>

            {activities.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activities.map(({ id, attributes: activity }: StrapiEntity<Activity>) => (
                    //console.log('Rendering Activity:', activity),
                    <ActivityCard key={id} activity={activity} />
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link
                    href="/actividades"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Ver Todas las Actividades
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">
                Próximamente actividades disponibles
              </p>
            )}
          </div>
        </section>

        {/* Micrositios */}
        {microsites.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Emprendimientos Destacados
                </h2>
                <p className="text-xl text-gray-600">
                  Conoce nuestros partners premium
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {microsites.map(({ id, attributes: microsite }: StrapiEntity<Microsite>) => (
                  <MicrositeCard key={id} microsite={microsite} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Eventos */}
        {events.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Próximos Eventos
                </h2>
                <p className="text-xl text-gray-600">
                  No te pierdas estas experiencias únicas
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map(({ id, attributes: event }: StrapiEntity<Event>) => (
                  <EventCard key={id} event={event} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para tu Aventura en Potrerillos?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Explora todas las actividades, alojamientos y servicios disponibles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/actividades"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Ver Actividades
              </Link>
              <Link
                href="/alojamiento"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold border-2 border-white"
              >
                Buscar Alojamiento
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading home data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error al cargar el contenido
          </h1>
          <p className="text-gray-600">
            Por favor, intenta nuevamente más tarde
          </p>
        </div>
      </div>
    );
  }
}

function HeroSection({ banner }: { banner?: Banner }) {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bienvenido al<br />
            Dique Potrerillos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Deportes acuáticos, trekking, aventura y naturaleza a solo 60km de Mendoza
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/actividades"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-center"
            >
              Explorar Actividades
            </Link>
            <Link
              href="/informacion"
              className="bg-blue-800 bg-opacity-50 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-opacity-70 transition-colors font-semibold text-center border-2 border-white"
            >
              Cómo Llegar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickSearch() {
  return (
    <div className="bg-white shadow-lg -mt-16 relative z-20 max-w-5xl mx-4 sm:mx-auto rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Todas las actividades</option>
          <option>Deportes de Agua</option>
          <option>Montaña</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Todas las dificultades</option>
          <option>Fácil</option>
          <option>Moderado</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Cualquier duración</option>
          <option>1-2 horas</option>
          <option>3-4 horas</option>
        </select>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
          Buscar
        </button>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const  attributes  = activity;
  //console.log('Activity Attributes:', activity, attributes);
 const imageUrl = attributes?.featured_image?.url
  ? getStrapiImageUrl(attributes.featured_image.url)
  : '/images/placeholder.jpg'; // Imagen por defecto
 console.log('Activity Image URL:', imageUrl);
  return (
    <Link href={`/actividades/${attributes?.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48 bg-gray-200">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={attributes?.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {attributes?.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            {attributes?.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {attributes?.duration}h
              </span>
            )}
            {attributes?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {attributes?.location}
              </span>
            )}
          </div>
          {attributes?.price_from && (
            <div className="text-lg font-bold text-blue-600">
              Desde ${attributes?.price_from.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function MicrositeCard({ microsite }: { microsite: Microsite }) {
  const  attributes = microsite;
  return (
    <Link href={`/emprendimientos/${attributes.slug}`}>
      <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold mb-2">{attributes.name}</h3>
        {attributes.subscription_plan === 'premium' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
            <Star className="w-4 h-4" />
            Premium
          </span>
        )}
      </div>
    </Link>
  );
}

function EventCard({ event }: { event: Event }) {
  const attributes = event;
  const eventDate = attributes?.event_date ? new Date(attributes.event_date) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long'
  }) : '';

  return (formattedDate && attributes?.title &&
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-2">
        <Calendar className="w-4 h-4" />
        {formattedDate}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">
        {attributes?.title}
      </h3>
    </div>
  );
}
