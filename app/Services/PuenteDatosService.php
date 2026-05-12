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
        $challenges = \App\Models\Challenge::selectRaw('category, count(*) as count')
            ->groupBy('category')
            ->get();
            
        $resources = \App\Models\ExternalResource::selectRaw('category, count(*) as count')
            ->groupBy('category')
            ->get();

        $holes = [];
        $covered = 0;
        $totalNeeds = $challenges->sum('count');

        foreach ($challenges as $challenge) {
            $resourceCount = $resources->where('category', $challenge->category)->first()?->count ?? 0;
            
            if ($resourceCount === 0) {
                $holes[] = [
                    'area' => $challenge->category,
                    'need_level' => $challenge->count > 5 ? 'Extremo' : 'Alto',
                    'resource_availability' => 'Nulo',
                    'recommendation' => 'Urgente: Buscar convenios en ' . $challenge->category
                ];
            } else {
                $covered += min($challenge->count, $resourceCount);
            }
        }

        return [
            'vulnerability_holes' => $holes,
            'matching_efficiency' => $totalNeeds > 0 ? round(($covered / $totalNeeds) * 100) : 100
        ];
    }
}
