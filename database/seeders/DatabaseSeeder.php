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

        \App\Models\Challenge::factory(10)->create([
            'user_id' => $user->id,
            'community_id' => $community->id,
            'lat' => function() { return 4.6097 + (rand(-100, 100) / 10000); },
            'lng' => function() { return -74.0817 + (rand(-100, 100) / 10000); },
        ]);
    }
}
