import { properties } from '@/lib/data';
import QueryForm from '@/components/QueryForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === params.id);

  if (!property) return notFound();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Listings</Link>
        
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-64 md:h-96 w-full relative">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {property.type}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              <p className="text-gray-600 mb-6">{property.location}</p>
              <p className="text-2xl font-bold text-gray-900 mb-8">{property.price}</p>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Listed by</p>
                <p className="font-semibold">{property.seller}</p>
              </div>
            </div>

            <div>
              <QueryForm propertyName={property.title} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
