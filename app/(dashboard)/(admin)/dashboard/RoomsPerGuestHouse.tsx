// components/RoomsPerGuestHouse.tsx
'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RoomsPerGuestHouse() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/v1/dashbored/stats/rooms-per-guesthouse');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('Données invalides reçues de l\'API');
        }
        
        // Trier les données par nombre de chambres (descendant)
        const sortedData = [...result.data].sort((a, b) => b.totalRooms - a.totalRooms);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="bg-white p-4 rounded-lg shadow h-80 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Chargement des données...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white p-4 rounded-lg shadow h-80 flex items-center justify-center">
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    </div>
  );

  if (!data.length) return (
    <div className="bg-white p-4 rounded-lg shadow h-80 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <p>Aucune donnée disponible</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Répartition des chambres par GuestHouse</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 60, // Plus d'espace pour les noms longs
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} chambres`, 'Nombre']}
              labelFormatter={(label) => `GuestHouse: ${label}`}
            />
            <Legend />
            <Bar 
              dataKey="totalRooms" 
              name="Nombre de chambres" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <p>Total chambres: {data.reduce((sum, item) => sum + item.totalRooms, 0)}</p>
        <p>Total GuestHouses: {data.length}</p>
      </div>
    </div>
  );
}