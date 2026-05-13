<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AntenaController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\ProjectController;
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

    // Módulo 2 (Actualizado): Desafíos
    Route::get('/challenges', [ChallengeController::class, 'index'])->name('challenges.index');
    Route::get('/challenges/create', [ChallengeController::class, 'create'])->name('challenges.create');
    Route::post('/challenges', [ChallengeController::class, 'store'])->name('challenges.store');
    Route::get('/challenges/{challenge}', [ChallengeController::class, 'show'])->name('challenges.show');
    Route::post('/challenges/{challenge}/vote', [ChallengeController::class, 'vote'])->name('challenges.vote');

    // Módulo 5: Proyectos (Aportes y Voluntarios)
    Route::post('/projects/{challenge}/contribute', [ProjectController::class, 'contribute'])->name('projects.contribute');
    Route::post('/projects/{challenge}/join', [ProjectController::class, 'join'])->name('projects.join');

    // Panel Administrativo (Punto de acceso a Módulos 1, 3, 4, 6)
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/antenas', [\App\Http\Controllers\Admin\AntenaController::class, 'index'])->name('admin.antenas');
        Route::get('/puente', [\App\Http\Controllers\Admin\PuenteDatosController::class, 'index'])->name('admin.puente');
    });
});

// Marketplace
Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');
Route::get('/marketplace/{slug}', [MarketplaceController::class, 'show'])->name('marketplace.show');

require __DIR__.'/auth.php';
