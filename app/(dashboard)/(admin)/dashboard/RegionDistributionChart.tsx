// components/RegionDistributionChart.tsx
'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export default function RegionDistributionChart() {
  const [data, setData] = useState<{name: string, value: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler des données - à remplacer par un appel API réel
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/v1/dashbored/GuestHouse/count/filtered');
        const result = await response.json();
        
        // Simuler des données par région (à adapter avec votre API)
        const mockData = [
          { name: 'Nord', value: 12 },
          { name: 'Sud', value: 8 },
          { name: 'Est', value: 5 },
          { name: 'Ouest', value: 7 }
        ];
        
        setData(mockData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Répartition par Région</h2>
      {loading ? (
        <div className="h-80 flex items-center justify-center">Chargement...</div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} GuestHouses`, 'Nombre']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}