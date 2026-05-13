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
        $challenge->load(['user', 'community', 'expenses', 'steps']);

        return Inertia::render('Desafios/Show', [
            'challenge' => $challenge,
            'expenses' => $challenge->expenses,
            'steps' => $challenge->steps
        ]);
    }

    public function vote(Challenge $challenge)
    {
        $userId = auth()->id() ?? \App\Models\User::first()->id;
        
        \App\Models\Vote::updateOrCreate([
            'user_id' => $userId,
            'challenge_id' => $challenge->id
        ]);

        return back()->with('success', '¡Gracias por tu voto! Tu prioridad ha sido registrada.');
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
