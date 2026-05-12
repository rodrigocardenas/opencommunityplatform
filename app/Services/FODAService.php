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

        // Lógica simplificada para el prototipo
        $fortalezasCount = 0;
        $debilidadesCount = 0;

        foreach ($reports as $report) {
            $data = $report->data;
            
            if ($report->type === 'infraestructura') {
                if (isset($data['status']) && $data['status'] === 'bueno') {
                    $fortalezasCount++;
                } else {
                    $debilidadesCount++;
                }
            }
            
            if ($report->type === 'ambiental') {
                if (isset($data['risk']) && $data['risk'] === 'alto') {
                    $analysis['amenazas'][] = 'Riesgo ambiental detectado: ' . ($data['description'] ?? 'Sequía/Incendio');
                }
            }
        }

        // Mocking some data if not enough reports
        $analysis['fortalezas'] = array_merge(['Fuerte cohesión comunitaria', 'Liderazgo vecinal activo'], $fortalezasCount > 2 ? ['Infraestructura resiliente'] : []);
        $analysis['oportunidades'] = ['Proyectos de financiamiento externos', 'Crecimiento de comercio local'];
        $analysis['debilidades'] = array_merge(['Acceso limitado a agua potable', 'Falta de iluminación pública'], $debilidadesCount > 2 ? ['Deterioro vial'] : []);
        $analysis['amenazas'] = array_merge(['Cambio climático (Sequía)', 'Migración descontrolada'], $analysis['amenazas']);

        return $analysis;
    }
}
