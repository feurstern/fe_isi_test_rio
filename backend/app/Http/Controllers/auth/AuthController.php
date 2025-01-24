<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only("email", "password");

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(["error" => "invalid credentials", "success" => false]);
        }

        return response()->json(["message" => "Success xixixxi", "success" => true, "token" => $token, 'user' => Auth::user()]);
    }

    function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    function me()
    {
        return response()->json(["user" => Auth::user()]);
    }
}
