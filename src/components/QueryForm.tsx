'use client';
import { useState } from 'react';

export default function QueryForm({ propertyName }: { propertyName: string }) {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending securely...');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      property: propertyName
    };

    try {
      const res = await fetch('/api/submit-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('Interest recorded! Our team will email you shortly.');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('Error sending message. Please try again.');
      }
    } catch (error) {
      setStatus('Network error occurred.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Show Interest</h3>
      <p className="text-sm text-gray-500 mb-6">Confidential query. Sent directly to our admin team, not the seller.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Your Name" required className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        <input type="email" name="email" placeholder="Your Email" required className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        <textarea name="message" placeholder="Ask about site visits, pricing, or documents..." rows={4} required className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
        <button type="submit" className="bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Send Secure Message
        </button>
      </form>
      {status && <p className="mt-4 text-sm font-medium text-blue-600 bg-blue-50 p-3 rounded-lg">{status}</p>}
    </div>
  );
}
