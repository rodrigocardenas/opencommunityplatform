<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AntenaService;
use Inertia\Inertia;

class AntenaController extends Controller
{
    protected $antenaService;

    public function __construct(AntenaService $antenaService)
    {
        $this->antenaService = $antenaService;
    }

    public function index()
    {
        return Inertia::render('Admin/AntenaIndex', [
            'alerts' => $this->antenaService->getPredictiveAlerts(),
            'heatmapData' => $this->antenaService->getHeatmapData(),
        ]);
    }
}
