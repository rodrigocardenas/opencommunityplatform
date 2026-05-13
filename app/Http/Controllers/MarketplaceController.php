<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketplaceController extends Controller
{
    public function index()
    {
        $businesses = Business::where('status', 'active')
            ->latest()
            ->get();

        return Inertia::render('Marketplace/Index', [
            'businesses' => $businesses,
            'categories' => [
                ['id' => 'comida', 'name' => 'Gastronomía', 'icon' => '🍕'],
                ['id' => 'entretencion', 'name' => 'Entretención', 'icon' => '🎭'],
                ['id' => 'patrimonio', 'name' => 'Patrimonio', 'icon' => '🏛️'],
                ['id' => 'eventos', 'name' => 'Eventos', 'icon' => '📅'],
                ['id' => 'naturaleza', 'name' => 'Naturaleza', 'icon' => '🌲'],
            ]
        ]);
    }

    public function show($slug)
    {
        $business = Business::where('slug', $slug)->firstOrFail();
        return Inertia::render('Marketplace/Show', [
            'business' => $business
        ]);
    }
}
