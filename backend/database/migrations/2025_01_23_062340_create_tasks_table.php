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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('descriptiion')->nullable();
            $table->foreignId("status_id")->constrained("statuses");
            $table->foreignId("create_by")->constrained("users")->cascadeOnDelete();
            $table->foreignId("update_by")->nullable()->constrained("users")->cascadeOnDelete();
            $table->foreignId("delete_by")->nullable()->constrained("users")->cascadeOnDelete();
            $table->foreignId("assigned_to")->nullable()->constrained("users")->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
