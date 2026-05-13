<?php

namespace App\Services;

use App\Models\Challenge;

class ProjectService
{
    /**
     * Transforma un desafío en un proyecto activo.
     */
    public function initializeProject(Challenge $challenge, float $goal, int $volunteers)
    {
        $challenge->update([
            'is_project' => true,
            'funding_goal' => $goal,
            'volunteers_needed' => $volunteers,
            'status' => 'in_progress'
        ]);

        return $challenge;
    }

    /**
     * Registra una donación real al proyecto.
     */
    public function contribute(Challenge $challenge, float $amount, $userId = null)
    {
        \App\Models\Donation::create([
            'user_id' => $userId ?? auth()->id(),
            'challenge_id' => $challenge->id,
            'amount' => $amount
        ]);

        $challenge->increment('funding_raised', $amount);
        return $challenge;
    }

    /**
     * Simula la inscripción de un voluntario.
     */
    public function volunteer(Challenge $challenge)
    {
        $challenge->increment('volunteers_count');
        return $challenge;
    }
}
