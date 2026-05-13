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
        $categories = ['Infraestructura', 'Salud', 'Educación', 'Seguridad', 'Ambiental', 'Salud Mental'];
        
        $challenges = \App\Models\Challenge::selectRaw('category, count(*) as count')
            ->whereIn('category', $categories)
            ->groupBy('category')
            ->get();
            
        $resources = \App\Models\ExternalResource::selectRaw('category, count(*) as count')
            ->whereIn('category', $categories)
            ->groupBy('category')
            ->get();

        $holes = [];
        $covered = 0;
        $totalNeeds = $challenges->sum('count');

        foreach ($categories as $category) {
            $challengeCount = $challenges->where('category', $category)->first()?->count ?? 0;
            if ($challengeCount === 0) continue;

            $resourceCount = $resources->where('category', $category)->first()?->count ?? 0;
            
            if ($resourceCount === 0) {
                $holes[] = [
                    'area' => $category,
                    'need_level' => $challengeCount > 3 ? 'Extremo' : 'Alto',
                    'resource_availability' => 'Nulo',
                    'recommendation' => 'Urgente: Buscar convenios en ' . $category
                ];
            } else {
                $covered += min($challengeCount, $resourceCount);
            }
        }

        return [
            'vulnerability_holes' => $holes,
            'matching_efficiency' => $totalNeeds > 0 ? round(($covered / $totalNeeds) * 100) : 100
        ];
    }
}
