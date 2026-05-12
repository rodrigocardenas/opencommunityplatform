<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        $community = \App\Models\Community::factory()->create([
            'name' => 'Comunidad Principal',
            'slug' => 'comunidad-principal',
            'lat' => 4.6097, // Bogota example
            'lng' => -74.0817,
        ]);

        $challenges = \App\Models\Challenge::factory(5)->create([
            'user_id' => $user->id,
            'community_id' => $community->id,
            'lat' => function() { return 4.6097 + (rand(-100, 100) / 10000); },
            'lng' => function() { return -74.0817 + (rand(-100, 100) / 10000); },
            'is_project' => true,
            'funding_goal' => 500000,
            'funding_raised' => 125000,
            'volunteers_needed' => 10,
            'volunteers_count' => 4,
            'status' => 'in_progress'
        ]);

        foreach ($challenges as $challenge) {
            \App\Models\ProjectExpense::create([
                'challenge_id' => $challenge->id,
                'description' => 'Materiales de construcción (Compra inicial)',
                'amount' => 45000,
                'date' => now()->subDays(5)
            ]);
            \App\Models\ProjectExpense::create([
                'challenge_id' => $challenge->id,
                'description' => 'Transporte y logística',
                'amount' => 15000,
                'date' => now()->subDays(2)
            ]);

            // Pasos del Timeline
            \App\Models\ProjectStep::create([
                'challenge_id' => $challenge->id,
                'title' => 'Diagnóstico Participativo',
                'description' => 'Levantamiento de necesidades con la junta de vecinos.',
                'status' => 'completed',
                'phase' => 'Fase 1',
                'responsible' => 'Comité Vecinal',
                'tasks' => [['id' => 1, 'text' => 'Firma de acta', 'completed' => true]]
            ]);

            \App\Models\ProjectStep::create([
                'challenge_id' => $challenge->id,
                'title' => 'Diseño Técnico',
                'description' => 'Elaboración de planos y presupuestos.',
                'status' => 'active',
                'phase' => 'Fase 2',
                'responsible' => 'Arquitectos Voluntarios',
                'tasks' => [['id' => 2, 'text' => 'Render 3D', 'completed' => true], ['id' => 3, 'text' => 'Cómputos', 'completed' => false]]
            ]);
        }

        \App\Models\Challenge::factory(5)->create([
            'user_id' => $user->id,
            'community_id' => $community->id,
            'lat' => function() { return 4.6097 + (rand(-100, 100) / 10000); },
            'lng' => function() { return -74.0817 + (rand(-100, 100) / 10000); },
            'is_project' => false
        ]);

        // Módulo 1 & 3: Reportes y Alertas
        \App\Models\CommunityReport::create([
            'user_id' => $user->id,
            'community_id' => $community->id,
            'type' => 'ambiental',
            'data' => ['problema' => 'Acumulación de basura en canal', 'gravedad' => 'alta'],
            'lat' => 4.6100,
            'lng' => -74.0820
        ]);

        \App\Models\Alert::create([
            'type' => 'risk',
            'severity' => 'high',
            'title' => 'Riesgo de Inundación Detectado',
            'description' => 'Aumento crítico de reportes ambientales en la ribera del río.',
            'prediction_date' => 'Próximos 10 días',
            'probability' => 88,
            'location' => 'Sector Norte'
        ]);

        \App\Models\Alert::create([
            'type' => 'maintenance',
            'severity' => 'medium',
            'title' => 'Mantenimiento de Alumbrado Pendiente',
            'description' => 'Se detecta un patrón de fallas en el cuadrante C-4.',
            'prediction_date' => 'Próxima semana',
            'probability' => 65,
            'location' => 'Cuadrante C-4'
        ]);

        // Módulo 4: Recursos Externos
        \App\Models\ExternalResource::create([
            'provider' => 'Ministerio de Vivienda',
            'program' => 'Pavimentación Participativa 2026',
            'category' => 'Infraestructura',
            'target_population' => 'Barrios vulnerables',
            'budget_available' => '$1.200.000.000',
            'status' => 'Convocatoria Abierta'
        ]);

        \App\Models\ExternalResource::create([
            'provider' => 'ONG Global Green',
            'program' => 'Reforestación Urbana Comunitaria',
            'category' => 'Ambiental',
            'target_population' => 'Comunas periféricas',
            'budget_available' => '5.000 árboles',
            'status' => 'Activo'
        ]);
    }
}
