<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskLogRequest;
use App\Http\Requests\UpdateTaskLogRequest;
use App\Models\TaskLog;

class TaskLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskLogRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskLog $taskLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TaskLog $taskLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskLogRequest $request, TaskLog $taskLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskLog $taskLog)
    {
        //
    }
}
