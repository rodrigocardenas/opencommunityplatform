<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AntenaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Módulo 1: Pulso Local
    Route::get('/pulso/kiosk', function () {
        return Inertia::render('PulsoLocal/Kiosk');
    })->name('pulso.kiosk');

    // Módulo 2: Desafíos del Pueblo
    Route::get('/desafios/leaderboard', [App\Http\Controllers\ChallengeController::class, 'leaderboard'])->name('desafios.leaderboard');
    Route::resource('desafios', ChallengeController::class)->only(['index', 'store', 'show']);

    // Módulo 3: Antenas Comunitarias (Recolección inicial)
    Route::get('/antenas', [AntenaController::class, 'index'])->name('antenas.index');
    Route::get('/antenas/create/{type}', [AntenaController::class, 'create'])->name('antenas.create');
    Route::post('/antenas', [AntenaController::class, 'store'])->name('antenas.store');

    // Panel Administrativo (Punto de acceso a Módulos 1, 3, 4, 6)
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    });
});

require __DIR__.'/auth.php';
