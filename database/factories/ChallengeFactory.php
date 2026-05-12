<?php

namespace Database\Factories;

use App\Models\Challenge;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Challenge>
 */
class ChallengeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'category' => $this->faker->randomElement(['Infraestructura', 'Medio Ambiente', 'Servicios', 'Social']),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'resolved']),
            'address' => $this->faker->address,
            'lat' => $this->faker->latitude(-90, 90),
            'lng' => $this->faker->longitude(-180, 180),
            'votes_count' => $this->faker->numberBetween(0, 100),
            'user_id' => \App\Models\User::factory(),
            'community_id' => \App\Models\Community::factory(),
        ];
    }
}
