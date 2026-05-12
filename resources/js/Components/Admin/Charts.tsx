import { 
    LineChart, 
    Line, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend
} from 'recharts';

export function DemographicChart({ data }: { data: any[] }) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line 
                        type="monotone" 
                        dataKey="poblacion" 
                        name="Población" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6 }} 
                    />
                    <Line 
                        type="monotone" 
                        dataKey="familias" 
                        name="Familias" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function CategoriesChart({ data }: { data: any[] }) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0' }}
                        cursor={{ fill: '#1e293b' }}
                    />
                    <Bar 
                        dataKey="total" 
                        name="Total Desafíos" 
                        fill="#8b5cf6" 
                        radius={[4, 4, 0, 0]} 
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
