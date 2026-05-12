<?php

namespace App\Services;

use App\Models\CommunityReport;
use App\Models\Challenge;

class AntenaService
{
    /**
     * Analiza reportes y desafíos para generar alertas predictivas.
     */
    public function getPredictiveAlerts()
    {
        $reports = CommunityReport::all();
        $challenges = Challenge::all();

        $alerts = [];

        // Lógica de simulación de IA basada en frecuencia de temas
        $environmentalReports = $reports->where('type', 'ambiental')->count();
        $infrastructureChallenges = $challenges->where('category', 'infraestructura')->count();

        if ($environmentalReports > 5) {
            $alerts[] = [
                'id' => 1,
                'type' => 'risk',
                'severity' => 'high',
                'title' => 'Riesgo de Inundación',
                'description' => 'Basado en el aumento de reportes ambientales y obstrucción de drenajes.',
                'prediction_date' => 'Próximos 15 días',
                'probability' => 85,
                'location' => 'Sector Ribera Norte'
            ];
        }

        if ($infrastructureChallenges > 3) {
            $alerts[] = [
                'id' => 2,
                'type' => 'maintenance',
                'severity' => 'medium',
                'title' => 'Falla Eléctrica Masiva',
                'description' => 'Patrón detectado en reportes de luminarias y transformadores.',
                'prediction_date' => 'Próxima semana',
                'probability' => 60,
                'location' => 'Zona Centro'
            ];
        }

        // Alerta de sentimiento social
        $alerts[] = [
            'id' => 3,
            'type' => 'social',
            'severity' => 'low',
            'title' => 'Aumento de Cohesión Social',
            'description' => 'Alta participación en reportes colaborativos detectada.',
            'prediction_date' => 'Continuo',
            'probability' => 90,
            'location' => 'Todo el Territorio'
        ];

        return $alerts;
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
