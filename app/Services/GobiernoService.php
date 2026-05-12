<?php

namespace App\Services;

use App\Models\Challenge;
use App\Models\ProjectExpense;

class GobiernoService
{
    /**
     * Obtiene los gastos detallados de un proyecto para transparencia.
     */
    public function getProjectTransparency(Challenge $challenge)
    {
        return $challenge->expenses()->orderBy('date', 'desc')->get();
    }

    /**
     * Simula la aprobación de un presupuesto participativo por votación vecinal.
     */
    public function approveParticipatoryBudget(Challenge $challenge, float $amount)
    {
        $challenge->update([
            'is_project' => true,
            'funding_goal' => $amount,
            'status' => 'approved'
        ]);

        return $challenge;
    }

    /**
     * Genera un reporte de impacto simplificado.
     */
    public function getImpactSummary(Challenge $challenge)
    {
        $totalSpent = $challenge->expenses()->sum('amount');
        $efficiency = $challenge->funding_goal > 0 ? (1 - ($totalSpent / $challenge->funding_goal)) * 100 : 0;

        return [
            'total_invested' => $challenge->funding_goal,
            'total_spent' => $totalSpent,
            'efficiency_rate' => round($efficiency, 2),
            'social_impact_score' => rand(80, 100) // Simulación
        ];
    }
}
