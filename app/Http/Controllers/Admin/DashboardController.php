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
        // Métricas reales
        $challengesTotal = Challenge::count();
        $challengesResolved = Challenge::where('status', 'resolved')->count();
        $challengesPending = Challenge::where('status', '!=', 'resolved')->count();
        $totalReports = \App\Models\CommunityReport::count();
        
        // Métricas simuladas (como lo pide el prototipo)
        $poblacionTotal = 2847 + $totalReports; // Influenciado por reportes
        $familias = 847;
        $produccion = 4490;
        $recursosHidricos = 462;

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

        // Datos para gráfico de líneas (Evolución Simulada)
        $demographicEvolution = [
            ['name' => 'Ene', 'poblacion' => 2700, 'familias' => 800],
            ['name' => 'Feb', 'poblacion' => 2750, 'familias' => 810],
            ['name' => 'Mar', 'poblacion' => 2780, 'familias' => 825],
            ['name' => 'Abr', 'poblacion' => 2800, 'familias' => 830],
            ['name' => 'May', 'poblacion' => 2847, 'familias' => 847],
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
            'foda' => $foda
        ]);
    }
}
