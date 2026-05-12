<?php

namespace App\Services;

use App\Models\CommunityReport;

class FODAService
{
    public function generateAnalysis()
    {
        $reports = CommunityReport::all();
        
        $analysis = [
            'fortalezas' => [],
            'oportunidades' => [],
            'debilidades' => [],
            'amenazas' => []
        ];

        foreach ($reports as $report) {
            $data = $report->data;
            
            if ($report->type === 'infraestructura') {
                if (isset($data['status']) && $data['status'] === 'bueno') {
                    $analysis['fortalezas'][] = 'Infraestructura en buen estado: ' . ($data['location'] ?? 'Sector General');
                } else {
                    $analysis['debilidades'][] = 'Falla de infraestructura detectada: ' . ($data['description'] ?? 'Vía dañada');
                }
            }
            
            if ($report->type === 'ambiental') {
                if (isset($data['gravedad']) && $data['gravedad'] === 'alta') {
                    $analysis['amenazas'][] = 'Riesgo crítico: ' . ($data['problema'] ?? 'Incendio/Inundación');
                }
            }
        }

        // Si no hay suficientes reportes, añadir bases del territorio
        if (empty($analysis['fortalezas'])) $analysis['fortalezas'] = ['Cohesión vecinal sólida', 'Liderazgo territorial'];
        if (empty($analysis['oportunidades'])) $analysis['oportunidades'] = ['Convenios con ONGs (Módulo 4)', 'Fondos concursables estatales'];
        if (empty($analysis['debilidades'])) $analysis['debilidades'] = ['Necesidad de digitalización local'];
        if (empty($analysis['amenazas'])) $analysis['amenazas'] = ['Cambio climático regional'];

        return $analysis;
    }
}
