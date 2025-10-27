# 🏔️ Potrerillos CMS - Frontend

Interfaz web para el sitio del Dique Potrerillos, Mendoza.

## 🚀 Características

- **Frontend** con Next.js 14+
- **Diseño responsive** con Tailwind CSS
- **Multilenguaje** (ES, EN, PT)
- **Integración** con Strapi CMS

## 📋 Prerequisitos

- Docker Desktop
- Node.js 20+ (opcional, para desarrollo sin Docker)
- Git

## 🛠️ Instalación Local

### Con Docker (Recomendado)
```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/potrerillos-frontend.git
cd potrerillos-frontend

# 2. Copiar archivo de entorno
cp .env.example .env

# 3. Editar .env con tus valores
nano .env

# 4. Construir e iniciar servicios
docker-compose up -d

# 5. Verificar estado de los servicios
docker-compose ps

# 6. Ver logs (opcional)
docker-compose logs -f
```

### Sin Docker (desarrollo)
```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/potrerillos-frontend.git
cd potrerillos-frontend

# 2. Instalar dependencias
npm install

# 3. Copiar archivo de entorno y editar
cp .env.example .env
nano .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

## ☁️ Despliegue en Cloudflare Pages

Para desplegar en Cloudflare Pages, hemos optimizado el proyecto para reducir el tamaño del bundle y cumplir con el límite de 25MB.

### Optimizaciones implementadas:

1. **Exportación estática** - La aplicación se construye como un sitio estático
2. **Reemplazo de React por Preact** - Reducción significativa del tamaño del bundle
3. **Optimización de imágenes** - Las imágenes se sirven estáticamente sin optimización del servidor
4. **Optimización de importaciones** - Solo se importan las partes necesarias de los paquetes

### Pasos para el despliegue:

1. Conecta tu repositorio GitHub a Cloudflare Pages
2. Configura los ajustes de compilación:
   - Comando de compilación: `./build-cf.sh`
   - Directorio de salida: `out`
3. Agrega las variables de entorno:
   - `NEXT_PUBLIC_API_URL`: URL de tu API Strapi
   - `NEXT_PUBLIC_STRAPI_URL`: URL base de tu instancia Strapi

### Variables de entorno requeridas:

- `NEXT_PUBLIC_API_URL`: La URL a tu API Strapi (ej. `https://tu-strapi-api.com/api`)
- `NEXT_PUBLIC_STRAPI_URL`: La URL base a tu instancia Strapi (ej. `https://tu-strapi-api.com`)

### Archivos de configuración de Cloudflare Pages:

1. `public/_routes.json` - Define qué rutas deben ser manejadas por Cloudflare Pages
2. `public/_headers` - Encabezados personalizados para seguridad y rendimiento
3. `public/_redirects` - Redirecciones para enrutamiento del lado del cliente

### Solución de problemas:

Si aún encuentras problemas con el tamaño del bundle:

1. Revisa las dependencias grandes:
   ```bash
   npm run build && du -sh .next/static/chunks/* | sort -hr
   ```

2. Analiza el bundle:
   ```bash
   npx @next/bundle-analyzer
   ```

Para más detalles, consulta el archivo [README-CLOUDFLARE.md](README-CLOUDFLARE.md).

## 📁 Estructura del Proyecto

```
potrerillos-frontend/
├── src/
│   ├── app/              # App Router (páginas)
│   ├── components/       # Componentes React
│   ├── lib/              # Librerías y utilidades
│   └── types/            # Definiciones de tipos TypeScript
├── public/               # Archivos estáticos
├── .env.example          # Variables de entorno de ejemplo
├── docker-compose.yml    # Configuración Docker
└── Dockerfile            # Imagen Docker de producción
```

## 🧪 Comandos Disponibles

```bash
npm run dev       # Iniciar servidor de desarrollo
npm run build     # Construir aplicación para producción
npm run start     # Iniciar servidor de producción
npm run lint      # Ejecutar linter
```

## 🐳 Docker

### Construir imagen de producción
```bash
docker build -t potrerillos-frontend .
```

### Ejecutar contenedor
```bash
docker run -p 3000:3000 potrerillos-frontend
```

## 🔧 Configuración

### Variables de Entorno
Copia `.env.example` a `.env` y ajusta los valores:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Ver archivo [LICENSE](LICENSE) para más información.

## 📞 Contacto

Tu Nombre - [@tu_usuario](https://twitter.com/tu_usuario) - tu.email@ejemplo.com

Enlace del Proyecto: [https://github.com/tu-usuario/potrerillos-frontend](https://github.com/tu-usuario/potrerillos-frontend)