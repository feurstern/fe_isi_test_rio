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

        $cookies = cookie(
            'token',
            $token,
            45,
            '/',
            null,
            false,
            true,
            false,
            'strict'
        );

        return response()->json(["message" => "Success xixixxi", "success" => true, "token" => $token, 'user' => Auth::user()])->cookie($cookies);
    }

    function logout()
    {
        Auth::logout();
        $cookies = cookie('token', '', -1);
        return response()->json(["success" => true, 'message' => 'Successfully logged out'])->cookie($cookies);
    }

    function me()
    {
        return response()->json(["user" => Auth::user()]);
    }
}
