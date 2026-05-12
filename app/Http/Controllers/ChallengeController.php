<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $challenges = Challenge::with(['user', 'community'])->latest()->get();
        
        return Inertia::render('Desafios/Index', [
            'challenges' => $challenges,
            'userStats' => [
                'points' => auth()->user()?->points ?? 0,
                'rank' => auth()->user()?->rank ?? 'Novato',
            ]
        ]);
    }

    public function leaderboard()
    {
        $users = User::orderBy('points', 'desc')->limit(10)->get();
        
        return Inertia::render('Desafios/Leaderboard', [
            'users' => $users,
            'currentUser' => auth()->user()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // No necesario, usaremos modal
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string|max:255',
            'category' => 'required|string',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
        ]);

        $validated['user_id'] = auth()->id();

        $challenge = Challenge::create($validated);

        // Gamificación: Premiar reporte
        $gamification = new \App\Services\GamificationService();
        $gamification->awardPoints(auth()->user(), 50, 'Reporte de desafío territorial');

        return redirect()->back()->with('success', 'Desafío creado exitosamente.')->with('reward', [
            'type' => 'points',
            'name' => 'Reporte Territorial',
            'points' => 50
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Challenge $challenge)
    {
        $challenge->load(['user', 'community']);

        // Mock data para el Timeline
        $steps = [
            [
                'id' => 1,
                'title' => 'Diagnóstico Participativo',
                'description' => 'Recopilación de datos y testimonios de la comunidad sobre la problemática.',
                'status' => 'completed',
                'phase' => 'Fase 1',
                'responsible' => 'Comité Vecinal',
                'tasks' => [
                    ['id' => 1, 'text' => 'Reunión inicial con vecinos', 'completed' => true],
                    ['id' => 2, 'text' => 'Levantamiento fotográfico', 'completed' => true],
                ]
            ],
            [
                'id' => 2,
                'title' => 'Planificación de Soluciones',
                'description' => 'Diseño técnico y presupuestario del proyecto comunitario.',
                'status' => 'active',
                'phase' => 'Fase 2',
                'responsible' => 'Equipo Técnico OCP',
                'tasks' => [
                    ['id' => 3, 'text' => 'Cómputos métricos', 'completed' => true],
                    ['id' => 4, 'text' => 'Búsqueda de financiamiento', 'completed' => false],
                ]
            ],
            [
                'id' => 3,
                'title' => 'Ejecución de Obras',
                'description' => 'Implementación física del proyecto en el territorio.',
                'status' => 'pending',
                'phase' => 'Fase 3',
                'responsible' => 'Contratista / Comunidad',
                'tasks' => [
                    ['id' => 5, 'text' => 'Inicio de faena', 'completed' => false],
                    ['id' => 6, 'text' => 'Supervisión técnica', 'completed' => false],
                ]
            ],
            [
                'id' => 4,
                'title' => 'Entrega y Evaluación',
                'description' => 'Inauguración y medición del impacto social generado.',
                'status' => 'pending',
                'phase' => 'Fase 4',
                'responsible' => 'Comunidad',
                'tasks' => [
                    ['id' => 7, 'text' => 'Informe final de impacto', 'completed' => false],
                ]
            ]
        ];

        return Inertia::render('Desafios/Show', [
            'challenge' => $challenge,
            'steps' => $steps
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Challenge $challenge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Challenge $challenge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Challenge $challenge)
    {
        //
    }
}
