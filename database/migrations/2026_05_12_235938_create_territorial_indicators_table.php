<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('territorial_indicators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('community_id')->constrained()->onDelete('cascade');
            $table->string('name'); // poblacion, familias, produccion, recursos_hidricos
            $table->decimal('value', 15, 2);
            $table->string('unit')->nullable(); // personas, %, l/s
            $table->date('measured_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('territorial_indicators');
    }
};
