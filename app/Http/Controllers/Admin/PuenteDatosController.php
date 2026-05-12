<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PuenteDatosService;
use Inertia\Inertia;

class PuenteDatosController extends Controller
{
    protected $puenteService;

    public function __construct(PuenteDatosService $puenteService)
    {
        $this->puenteService = $puenteService;
    }

    public function index()
    {
        return Inertia::render('Admin/PuenteDatosIndex', [
            'resources' => $this->puenteService->getExternalResources(),
            'gapAnalysis' => $this->puenteService->getGapAnalysis(),
        ]);
    }
}
