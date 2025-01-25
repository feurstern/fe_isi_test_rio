<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(["auth:api", 'throttle:60,1'])->prefix("task")->group(function () {
    Route::get("/list", [TaskController::class, "index"])->name("task.list");
    Route::post("/create", [TaskController::class, "store"])->name("task.store");
    Route::post("/delete/{id}", [TaskController::class, "destroy"])->name("task.delete");
    Route::post("/update/{id}", [TaskController::class, "update"])->name('task.update');
    Route::get("detail/{id}", [TaskController::class, "show"])->name('taks.detail');
});

Route::middleware(['auth:api', 'throttle:60,1'])->prefix("user")->group(function () {
    Route::get("/team-role", [UserController::class, "getTeamRole"])->name('user.team-role');
});


Route::post("/login", [AuthController::class, 'login']);
Route::get("/create", [UserController::class, "create"]);
