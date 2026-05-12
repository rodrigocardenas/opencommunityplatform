<?php

namespace App\Services;

class PuenteDatosService
{
    /**
     * Simula la obtención de datos de fuentes externas (Censos, ONGs, Estado).
     */
    public function getExternalResources()
    {
        return [
            [
                'id' => 1,
                'provider' => 'Ministerio de Vivienda',
                'program' => 'Subsidio de Aislamiento Térmico',
                'category' => 'Vivienda',
                'target_population' => 'Familias vulnerables',
                'budget_available' => '$500,000,000',
                'status' => 'Convocatoria Abierta'
            ],
            [
                'id' => 2,
                'provider' => 'ONG Techo',
                'program' => 'Viviendas de Emergencia',
                'category' => 'Vivienda',
                'target_population' => 'Campamentos',
                'budget_available' => '15 unidades',
                'status' => 'Activo'
            ],
            [
                'id' => 3,
                'provider' => 'Banco de Alimentos',
                'program' => 'Red de Ollas Comunes',
                'category' => 'Alimentación',
                'target_population' => 'Comedores comunitarios',
                'budget_available' => '5 toneladas/mes',
                'status' => 'Activo'
            ]
        ];
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
