// components/RoomStatsChart.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export default function RoomStatsChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/v1/dashbored/rooms/count/filtered');
        const result = await response.json();
        
        // Simuler des données par type de chambre
        const mockData = [
          { type: 'Standard', active: 45, inactive: 12 },
          { type: 'Deluxe', active: 28, inactive: 5 },
          { type: 'Suite', active: 15, inactive: 3 },
        ];
        
        setData(result.data || mockData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Statut des Chambres par Type</h2>
      {loading ? (
        <div className="h-80 flex items-center justify-center">Chargement...</div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="type" 
                angle={-45} 
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" name="Actives" fill="#8884d8" />
              <Bar dataKey="inactive" name="Inactives" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}