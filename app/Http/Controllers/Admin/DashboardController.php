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

        // Prioridades Votadas (Top 5)
        $topPriorities = Challenge::withCount('votes')
            ->orderBy('votes_count', 'desc')
            ->take(5)
            ->get()
            ->map(fn($c) => [
                'title' => $c->title,
                'votes' => $c->votes_count,
                'category' => $c->category
            ]);

        // Mercado Local
        $businessStats = [
            'total' => \App\Models\Business::count(),
            'active' => \App\Models\Business::where('status', 'active')->count(),
            'pending' => \App\Models\Business::where('status', 'pending')->count(),
        ];

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
            'pilot_stats' => [
                'priorities' => $topPriorities,
                'business' => $businessStats
            ],
            'foda' => $foda
        ]);
    }
}
