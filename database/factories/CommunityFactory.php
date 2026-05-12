<?php

namespace Database\Factories;

use App\Models\Community;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Community>
 */
class CommunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->city,
            'slug' => $this->faker->unique()->slug,
            'description' => $this->faker->paragraph,
            'address' => $this->faker->address,
            'lat' => $this->faker->latitude(-90, 90),
            'lng' => $this->faker->longitude(-180, 180),
            'status' => 'active',
        ];
    }
}
