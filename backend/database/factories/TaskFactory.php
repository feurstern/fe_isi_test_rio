<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => fake()->sentence(5),
            "description" => fake()->sentence(10),
            "status_id" => random_int(1, 4),
            "create_by" => 8,
            "assigned_to" => random_int(3, 8),
            "created_at" => now(),

        ];
    }
}
