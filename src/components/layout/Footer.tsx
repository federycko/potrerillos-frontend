import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Potrerillos</h3>
            <p className="text-sm mb-4">
              Tu guía completa para descubrir el Dique Potrerillos. Actividades, alojamiento y servicios en un solo lugar.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/informacion" className="hover:text-white transition-colors">Historia</Link></li>
              <li><Link href="/informacion" className="hover:text-white transition-colors">Geografía y Clima</Link></li>
              <li><Link href="/informacion" className="hover:text-white transition-colors">Cómo Llegar</Link></li>
              <li><Link href="/informacion" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Actividades */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Actividades</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/actividades?categoria=deportes-agua" className="hover:text-white transition-colors">Deportes de Agua</Link></li>
              <li><Link href="/actividades?categoria=montana" className="hover:text-white transition-colors">Montaña</Link></li>
              <li><Link href="/actividades?categoria=aventura" className="hover:text-white transition-colors">Aventura</Link></li>
              <li><Link href="/alojamiento" className="hover:text-white transition-colors">Alojamiento</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Ruta 82, Km 60<br />Potrerillos, Mendoza</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+542614567890" className="hover:text-white transition-colors">
                  +54 261 456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@potrerillos.com" className="hover:text-white transition-colors">
                  info@potrerillos.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {currentYear} Dique Potrerillos. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
              <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
