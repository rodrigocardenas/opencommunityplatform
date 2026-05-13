<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function contribute(Request $request, Challenge $challenge)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = auth()->user() ?? \App\Models\User::first();
        
        $this->projectService->contribute($challenge, $user, $request->amount);

        return back()->with('success', '¡Aporte realizado con éxito! Gracias por fortalecer tu comunidad.');
    }

    public function join(Challenge $challenge)
    {
        $challenge->increment('volunteers_count');
        return back()->with('success', '¡Te has unido como voluntario!');
    }
}
