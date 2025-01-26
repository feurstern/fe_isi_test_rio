<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $main_user = ([
            [
                "name" => "Hatsune Miku",
                "email" => "mikumiku@vocaloid.jp",
                "password" => Hash::make("password123!"),
                "role_id" => 1,
                "email_verified_at" => now(),
                "created_at" => now(),
            ],
            [
                "name" => "Yuukirin",
                "email" => "yuki@gmail.com",
                "password" => Hash::make("Yuukirinkawaii123!"),
                "role_id" => 2,
                "email_verified_at" => now(),
                "created_at" => now(),
            ]
        ]);

        DB::table('users')->insert($main_user);
    }
}
