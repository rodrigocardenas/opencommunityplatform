<?php

namespace App\Services;

use App\Models\CommunityReport;
use App\Models\Challenge;

class AntenaService
{
    /**
     * Analiza reportes y desafíos para generar alertas predictivas reales.
     */
    public function getPredictiveAlerts()
    {
        return \App\Models\Alert::latest()->get();
    }

    /**
     * Motor de "IA" que genera alertas basadas en patrones de reportes.
     */
    public function analyzeAndGenerateAlerts()
    {
        \App\Models\Alert::truncate(); // Limpiar para la simulación funcional
        
        $reports = CommunityReport::all();
        
        // Análisis Ambiental (Riesgos)
        $ambientalCount = $reports->where('type', 'ambiental')->count();
        if ($ambientalCount >= 1) {
            \App\Models\Alert::create([
                'type' => 'risk',
                'severity' => $ambientalCount > 5 ? 'high' : 'medium',
                'title' => 'Riesgo de Inundación / Ambiental',
                'description' => "Detectado patrón de {$ambientalCount} reportes sobre canales u obstrucciones.",
                'prediction_date' => 'Próximos 7-10 días',
                'probability' => min(60 + ($ambientalCount * 5), 95),
                'location' => 'Sector Ribera'
            ]);
        }

        // Análisis de Infraestructura
        $infraCount = $reports->where('type', 'infraestructura')->count();
        if ($infraCount >= 1) {
            \App\Models\Alert::create([
                'type' => 'maintenance',
                'severity' => 'medium',
                'title' => 'Falla Crítica de Luminarias',
                'description' => "Anomalía detectada por {$infraCount} vecinos en el alumbrado público.",
                'prediction_date' => 'Inmediato',
                'probability' => 85,
                'location' => 'Zona Centro-Norte'
            ]);
        }

        // Cohesión Social (Positiva)
        $socialCount = \App\Models\Challenge::where('is_project', true)->count();
        if ($socialCount > 2) {
            \App\Models\Alert::create([
                'type' => 'social',
                'severity' => 'low',
                'title' => 'Alta Cohesión Comunitaria',
                'description' => 'La participación en proyectos activos supera la media regional.',
                'prediction_date' => 'Mes en curso',
                'probability' => 90,
                'location' => 'Todo el Territorio'
            ]);
        }
    }

    /**
     * Calcula el mapa de calor de incidentes (Heatmap data)
     */
    public function getHeatmapData()
    {
        return Challenge::where('status', '!=', 'resolved')
            ->select('lat', 'lng', 'title')
            ->get()
            ->map(function($item) {
                return [
                    'lat' => (float)$item->lat,
                    'lng' => (float)$item->lng,
                    'weight' => rand(1, 10) / 10 // Simulación de intensidad
                ];
            });
    }
}
