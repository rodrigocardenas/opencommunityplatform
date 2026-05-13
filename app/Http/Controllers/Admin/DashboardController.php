<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Challenge;
use App\Models\User;

use App\Services\FODAService;

class DashboardController extends Controller
{
    public function index(FODAService $fodaService)
    {
        $foda = $fodaService->generateAnalysis();
        
        // Métricas básicas
        $challengesTotal = Challenge::count();
        $challengesPending = Challenge::where('status', '!=', 'resolved')->count();
        $totalReports = \App\Models\CommunityReport::count();
        
        // Indicadores Territoriales (Dinámicos)
        $latestIndicators = \App\Models\TerritorialIndicator::latest('measured_at')
            ->get()
            ->groupBy('name')
            ->map(fn($group) => $group->first()->value);

        $poblacionTotal = $latestIndicators['poblacion'] ?? 0;
        $familias = $latestIndicators['familias'] ?? 0;
        $produccion = $latestIndicators['produccion'] ?? 0;
        $recursosHidricos = $latestIndicators['recursos_hidricos'] ?? 0;

        // Datos para gráfico de barras (Desafíos por Categoría)
        $challengesByCategory = Challenge::selectRaw('category, count(*) as count')
            ->groupBy('category')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->category,
                    'total' => $item->count
                ];
            });

        // Evolución Demográfica (Histórica real)
        $demographicEvolution = \App\Models\TerritorialIndicator::whereIn('name', ['poblacion', 'familias'])
            ->orderBy('measured_at')
            ->get()
            ->groupBy(fn($item) => $item->measured_at->format('M'))
            ->map(function ($items, $month) {
                return [
                    'name' => $month,
                    'poblacion' => $items->where('name', 'poblacion')->first()?->value ?? 0,
                    'familias' => $items->where('name', 'familias')->first()?->value ?? 0,
                ];
            })->values();

        return Inertia::render('Admin/Dashboard', [
            'kpis' => [
                'poblacion' => $poblacionTotal,
                'familias' => $familias,
                'produccion' => $produccion,
                'recursos' => $recursosHidricos,
                'desafios_totales' => $challengesTotal,
                'desafios_pendientes' => $challengesPending,
                'reportes_totales' => $totalReports,
            ],
            'charts' => [
                'categories' => $challengesByCategory,
                'demographic' => $demographicEvolution,
            ],
            'foda' => $foda
        ]);
    }
}
