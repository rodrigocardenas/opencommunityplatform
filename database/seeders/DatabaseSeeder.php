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

        // Indicadores Históricos para el Dashboard
        $months = ['2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01'];
        $basePop = 2700;
        $baseFam = 800;

        foreach ($months as $index => $date) {
            \App\Models\TerritorialIndicator::create([
                'community_id' => $community->id,
                'name' => 'poblacion',
                'value' => $basePop + ($index * 35),
                'unit' => 'personas',
                'measured_at' => $date
            ]);
            \App\Models\TerritorialIndicator::create([
                'community_id' => $community->id,
                'name' => 'familias',
                'value' => $baseFam + ($index * 12),
                'unit' => 'hogares',
                'measured_at' => $date
            ]);
            \App\Models\TerritorialIndicator::create([
                'community_id' => $community->id,
                'name' => 'produccion',
                'value' => 4000 + ($index * 100),
                'unit' => 'ton',
                'measured_at' => $date
            ]);
            \App\Models\TerritorialIndicator::create([
                'community_id' => $community->id,
                'name' => 'recursos_hidricos',
                'value' => 450 + rand(0, 50),
                'unit' => 'l/s',
                'measured_at' => $date
            ]);
        }

        $challenges = \App\Models\Challenge::factory(5)->create([
            'user_id' => $user->id,
            'community_id' => $community->id,
            'lat' => function() { return 4.6097 + (rand(-100, 100) / 10000); },
            'lng' => function() { return -74.0817 + (rand(-100, 100) / 10000); },
            'is_project' => true,
            'funding_goal' => 500000,
            'volunteers_needed' => 10,
            'volunteers_count' => 4,
            'status' => 'in_progress'
        ]);

        $projectService = new \App\Services\ProjectService();
        foreach ($challenges as $challenge) {
            $projectService->contribute($challenge, 125000, $user->id);
            
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
        for ($i = 0; $i < 10; $i++) {
            \App\Models\CommunityReport::create([
                'user_id' => $user->id,
                'community_id' => $community->id,
                'type' => $i % 2 == 0 ? 'ambiental' : 'infraestructura',
                'data' => [
                    'problema' => $i % 2 == 0 ? 'Microbasural detectado' : 'Luminaria apagada',
                    'gravedad' => 'alta',
                    'location' => 'Sector ' . ($i < 5 ? 'Norte' : 'Sur')
                ],
                'lat' => 4.6097 + (rand(-100, 100) / 10000),
                'lng' => -74.0817 + (rand(-100, 100) / 10000)
            ]);
        }

        // Ejecutar motor de IA de Antena para generar alertas reales
        $antenaService = new \App\Services\AntenaService();
        $antenaService->analyzeAndGenerateAlerts();

        // Módulo 7: Marketplace de Economía Local (Piloto Futaleufú)
        $pilotBusinesses = [
            [
                'name' => 'Eco-Hospedaje El Espolón',
                'category' => 'naturaleza',
                'description' => 'Alojamiento sustentable con vista al río Espolón. Desayunos orgánicos incluidos.',
                'whatsapp' => '56912345678'
            ],
            [
                'name' => 'Rafting Futaleufú Pro',
                'category' => 'entretencion',
                'description' => 'Guías certificados internacionalmente. Descenso de clase IV y V en el río más salvaje del mundo.',
                'whatsapp' => '56987654321'
            ],
            [
                'name' => 'Sabores de la Patagonia',
                'category' => 'comida',
                'description' => 'Cocina de autor con ingredientes 100% locales. Especialidad en cordero al palo.',
                'whatsapp' => '56955544433'
            ],
            [
                'name' => 'Telares de Futaleufú',
                'category' => 'patrimonio',
                'description' => 'Artesanía en lana de oveja hilada a mano. Diseños ancestrales patagónicos.',
                'whatsapp' => '56922211100'
            ]
        ];

        foreach ($pilotBusinesses as $biz) {
            \App\Models\Business::create([
                'user_id' => $user->id,
                'name' => $biz['name'],
                'slug' => \Illuminate\Support\Str::slug($biz['name']),
                'description' => $biz['description'],
                'category' => $biz['category'],
                'contact_whatsapp' => $biz['whatsapp'],
                'contact_phone' => $biz['whatsapp'],
                'status' => 'active',
                'is_featured' => true
            ]);
        }

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

        // Desafíos sin cobertura (Generarán "Holes" en el Gap Analysis)
        \App\Models\Challenge::create([
            'user_id' => $user->id,
            'community_id' => $community->id,
            'title' => 'Necesidad de Apoyo Psicológico',
            'description' => 'Aumento de ansiedad en jóvenes del sector.',
            'category' => 'Salud Mental',
            'status' => 'pending',
            'address' => 'Barrio Alto',
            'lat' => 4.6150,
            'lng' => -74.0850,
            'is_project' => false
        ]);
    }
}
