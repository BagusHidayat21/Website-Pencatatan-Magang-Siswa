<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DudiController;
use App\Http\Controllers\LogbookController;
use App\Http\Controllers\MagangController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('magang', MagangController::class);
    Route::apiResource('dudi', DudiController::class);
    Route::apiResource('logbook', LogbookController::class);
});

