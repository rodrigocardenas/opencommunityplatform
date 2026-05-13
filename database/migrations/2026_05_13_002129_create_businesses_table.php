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
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->enum('category', ['comida', 'entretencion', 'patrimonio', 'eventos', 'naturaleza']);
            $table->string('contact_phone')->nullable();
            $table->string('contact_whatsapp')->nullable();
            $table->string('image_url')->nullable();
            $table->enum('status', ['pending', 'active', 'rejected'])->default('pending');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
