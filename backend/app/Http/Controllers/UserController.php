<?php

namespace App\Http\Controllers;

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
}
