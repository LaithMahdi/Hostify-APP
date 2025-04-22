// components/ReservationStats.tsx
'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReservationStats() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/v1/dashbored/dashbored/reservations/count');
        const result = await response.json();
        
        // Transformez les données pour Recharts
        const chartData = [
          { name: 'Confirmées', value: result.stats.byStatus.confirmed },
          { name: 'En attente', value: result.stats.byStatus.pending },
          { name: 'Annulées', value: result.stats.byStatus.cancelled }
        ];
        
        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Statut des Réservations</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}