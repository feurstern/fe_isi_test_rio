<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function store() {}


    function create()
    {
        DB::table('users')->where('id', 8)->update([
            'password' => Hash::make('password123')
        ]);
    }

    function getTeamRole()
    {
        $data = User::whereNull('deleted_at')->where("role_id", 2)->get();

        if (!$data) {
            return response()->json(["message" => "no team role found!", "success" => false]);
        }

        return response()->json(["success" => true, "data" => $data]);
    }
}
