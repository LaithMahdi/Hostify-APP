// components/ReservationTrendChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export default function ReservationTrendChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler des données temporelles - à remplacer par un appel API réel
    const fetchData = async () => {
      try {
        // Exemple d'appel API - à adapter avec vos endpoints
        const response = await fetch('http://localhost:3005/api/v1/dashbored/reservations/stats/time-series');
        const result = await response.json();
        
        // Données simulées si l'API n'est pas disponible
        const mockData = [
          { month: 'Jan', reservations: 45 },
          { month: 'Fév', reservations: 68 },
          { month: 'Mar', reservations: 72 },
          { month: 'Avr', reservations: 89 },
          { month: 'Mai', reservations: 76 },
          { month: 'Juin', reservations: 94 },
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
      <h2 className="text-lg font-semibold mb-4">Évolution des Réservations</h2>
      {loading ? (
        <div className="h-80 flex items-center justify-center">Chargement...</div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} réservations`, 'Nombre']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="reservations"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Réservations"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}