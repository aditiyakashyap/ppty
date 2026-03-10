import Link from 'next/link';
import { properties } from '@/lib/data';

export default function Home() {
  const sortedProperties = [...properties].sort((a, b) => Number(b.isPromoted) - Number(a.isPromoted));

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">Prime<span className="text-blue-600">Estates</span></h1>
          <Link href="/login" className="bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800">
            Seller Login
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property) => (
            <Link href={`/property/${property.id}`} key={property.id} className="group cursor-pointer block">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow relative">
                {property.isPromoted && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    Featured
                  </div>
                )}
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-blue-600 mb-1">{property.type}</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{property.location}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="font-bold text-lg">{property.price}</span>
                    <span className="text-sm text-gray-400 border border-gray-200 px-2 py-1 rounded">{property.seller}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
