'use client';

import { useRouter } from 'next/navigation';

export default function ErrorComponent() {
  const router = useRouter();
  
  const handleRetry = () => {
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Oops! Algo salió mal</h2>
        <p className="text-stone-600 mb-6">No pudimos cargar el contenido principal.</p>
        <button 
          onClick={handleRetry}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}