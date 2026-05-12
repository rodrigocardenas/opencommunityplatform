<?php

namespace App\Services;

class PuenteDatosService
{
    /**
     * Simula la obtención de datos de fuentes externas (Censos, ONGs, Estado).
     */
    public function getExternalResources()
    {
        return \App\Models\ExternalResource::all();
    }

    /**
     * Realiza un "Gap Analysis" comparando desafíos comunitarios con recursos externos.
     */
    public function getGapAnalysis()
    {
        return [
            'vulnerability_holes' => [
                [
                    'area' => 'Salud Mental',
                    'need_level' => 'Extremo',
                    'resource_availability' => 'Nulo',
                    'recommendation' => 'Contactar Red de Psicólogos Voluntarios.'
                ],
                [
                    'area' => 'Acceso a Agua',
                    'need_level' => 'Alto',
                    'resource_availability' => 'Bajo (Solo camiones aljibe)',
                    'recommendation' => 'Postular a fondos de mejora de APR.'
                ]
            ],
            'matching_efficiency' => 65 // Porcentaje de necesidades cubiertas por programas actuales
        ];
    }
}
