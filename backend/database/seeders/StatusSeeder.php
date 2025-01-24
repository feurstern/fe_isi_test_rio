<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ([
            ["name" => 'Not started', "created_at" => now()],
            ["name" => 'On Progress', "created_at" => now()],
            ["name" => 'Done', "created_at" => now()],
            ["name" => 'Reject', "created_at" => now()],
        ]);


        DB::table("statuses")->insert($statuses);
    }
}
