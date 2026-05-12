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
        Schema::table('challenges', function (Blueprint $table) {
            $table->boolean('is_project')->default(false);
            $table->decimal('funding_goal', 15, 2)->default(0);
            $table->decimal('funding_raised', 15, 2)->default(0);
            $table->integer('volunteers_needed')->default(0);
            $table->integer('volunteers_count')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('challenges', function (Blueprint $table) {
            //
        });
    }
};
