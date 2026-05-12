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
        return \App\Models\Alert::all();
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
