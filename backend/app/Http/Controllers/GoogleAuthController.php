<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{

    function redirect()
    {
        return Socialite::driver("google")->redirect();
    }


    function handleCallbackGoogle()
    {
        try {
            $google_user = Socialite::driver('google')->user();

            $user = User::whereNull("deleted_at")->where("google_id", $google_user->getId())->first();
            if ($user) {
                Auth::login($user);
                return response()->json(["messsage" => "user is already exisit", "success" => true]);
            }

            $user = new User();

            $user->name = $google_user->getName();
            $user->email = $google_user->getEmail();
            $user->google_id = $google_user->getId();

            $save = $user->save();

            Auth::login($user);

            return $save ?
                response()->json(["message" => $user, "success" => $save])
                : response()->json(["message" => "failede to login with google", "success" => $save]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Error when trying to connect with google aaccount", "sucess" => false]);
        }
    }
}
