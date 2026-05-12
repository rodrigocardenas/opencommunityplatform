<?php

namespace App\Services;

use App\Models\User;

class GamificationService
{
    public function awardPoints(User $user, int $points, string $reason = '')
    {
        $user->points += $points;
        
        // Lógica de rangos
        if ($user->points >= 1000) {
            $user->rank = 'Líder Comunitario';
        } elseif ($user->points >= 500) {
            $user->rank = 'Activista Local';
        } elseif ($user->points >= 100) {
            $user->rank = 'Colaborador';
        }

        $user->save();

        return $user;
    }

    public function awardBadge(User $user, string $badgeType)
    {
        $badges = $user->badges ?? [];
        
        if (!in_array($badgeType, $badges)) {
            $badges[] = $badgeType;
            $user->badges = $badges;
            $user->save();
        }

        return $user;
    }
}
