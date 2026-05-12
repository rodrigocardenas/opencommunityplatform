<?php

namespace App\Http\Controllers;

use App\Models\CommunityReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AntenaController extends Controller
{
    public function index()
    {
        $categories = [
            [
                'id' => 'demografico',
                'title' => 'Reporte Demográfico',
                'description' => 'Población, grupos etarios, migración',
                'icon' => '👥',
                'color' => 'blue'
            ],
            [
                'id' => 'infraestructura',
                'title' => 'Estado de Infraestructura',
                'description' => 'Caminos, servicios básicos, edificaciones',
                'icon' => '🏗️',
                'color' => 'amber'
            ],
            [
                'id' => 'agricola',
                'title' => 'Producción Agrícola',
                'description' => 'Cultivos, rendimientos, condiciones',
                'icon' => '🌾',
                'color' => 'emerald'
            ],
            [
                'id' => 'ambiental',
                'title' => 'Condiciones Ambientales',
                'description' => 'Clima, recursos naturales, riesgos',
                'icon' => '🌿',
                'color' => 'green'
            ],
            [
                'id' => 'social',
                'title' => 'Indicadores Sociales',
                'description' => 'Bienestar, necesidades, organizaciones',
                'icon' => '🤝',
                'color' => 'purple'
            ],
            [
                'id' => 'economico',
                'title' => 'Actividad Económica',
                'description' => 'Empleo, ingresos, comercio local',
                'icon' => '💼',
                'color' => 'slate'
            ]
        ];

        return Inertia::render('Antenas/Index', [
            'categories' => $categories
        ]);
    }

    public function create(string $type)
    {
        return Inertia::render('Antenas/Create', [
            'type' => $type
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'data' => 'required|array',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'community_id' => 'nullable|exists:communities,id',
        ]);

        $validated['user_id'] = auth()->id() ?? \App\Models\User::first()->id;

        CommunityReport::create($validated);

        return redirect()->route('antenas.index')->with('success', 'Reporte enviado con éxito.');
    }
}
