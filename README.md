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

## 🌐 Acceso al servicio

Después de iniciar los contenedores:

| Servicio | URL | Puerto | Descripción |
|----------|-----|--------|-------------|
| **Frontend** | http://localhost:3001 | 3001 | Aplicación Next.js |

## 🔧 Comandos útiles

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir contenedores
docker-compose build --no-cache

# Reiniciar un servicio
docker-compose restart

# Acceder a la shell de un contenedor
docker exec -it potrerillos_nextjs sh
```

## 📂 Estructura del proyecto

```
potrerillos-frontend/
├── src/                  # Código fuente del frontend
│   ├── app/              # Componentes de página
│   ├── components/       # Componentes reutilizables
│   └── lib/              # Librerías y utilidades
├── public/               # Archivos estáticos
├── Dockerfile            # Dockerfile para producción
├── Dockerfile.dev        # Dockerfile para desarrollo
├── docker-compose.yml    # Orquestación de contenedores
├── next.config.ts        # Configuración de Next.js
├── package.json          # Dependencias y scripts
├── .env                  # Variables de entorno
└── README.md
```

## 🚀 Deployment en Producción

### Opción 1: Docker

1. Copiar el repositorio:
```bash
git clone https://github.com/tu-usuario/potrerillos-frontend.git
cd potrerillos-frontend
```

2. Configurar variables de entorno:
```bash
cp .env.production.example .env.production
# Editar .env.production con tus valores de producción
```

3. Construir y ejecutar con Docker:
```bash
# Construir imagen
docker build -t potrerillos-frontend .

# Ejecutar contenedor
docker run -d \
  --name potrerillos-frontend \
  --env-file .env.production \
  -p 3000:3000 \
  potrerillos-frontend
```

### Opción 2: Cloudflare Pages (Recomendado)

1. En el dashboard de Cloudflare Pages:
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio `potrerillos-frontend`
   - Configura las variables de entorno en "Environment Variables"
   - Configura el comando de build: `npm run build`
   - Directorio de salida: `.next`

2. Configuración adicional en Cloudflare Pages:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Environment variables:
     - NEXT_PUBLIC_API_URL: `https://your-api-domain.com/api`
     - NEXT_PUBLIC_STRAPI_URL: `https://your-api-domain.com`
     - NEXT_PUBLIC_SITE_URL: `https://your-frontend-domain.com`

## 🔒 Configuración de producción

Para producción, asegúrate de:

1. Actualizar las URLs de la API en las variables de entorno
2. Configurar dominios personalizados
3. Configurar SSL si es necesario

## 🐛 Troubleshooting

### Los cambios no se reflejan
```bash
# Next.js usa polling en Docker
# Verificar que WATCHPACK_POLLING=true esté en docker-compose.yml

# Reiniciar el servicio
docker-compose restart
```

## 📝 Notas de desarrollo

- Los volúmenes de desarrollo están montados para hot-reload
- `node_modules` se gestiona dentro del contenedor
- La aplicación escucha en el puerto 3000 dentro del contenedor

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contacto

Proyecto Dique Potrerillos - [@tu-usuario](https://github.com/tu-usuario)