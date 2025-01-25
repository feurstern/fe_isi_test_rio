<?php

namespace App\Http\Controllers;

use App\Http\Controllers\auth\AuthController;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\TaskLog;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return  Task::whereNull("deleted_at")->get();
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
    public function store(StoreTaskRequest $request)
    {
        $data  = $request->all();

        // $user  = Auth::user();
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json(["message" => "invalid credentialss"]);
        }

        // dd($data);

        $task = new Task();

        $task->title = $data['title'];
        $task->description = $data['description'];
        $task->status_id = $data['status_id'];
        $task->create_by =  $user->id;
        $task->assigned_to = $data['assigned_to'];
        $task->update_by = null;
        $task->deleted_at = null;
        $task->delete_by = null;
        $task->created_at = now();

        $save = $task->save();

        return $save ? response()->json(["success" => $save, "data" => $task]) : response()->json(["success" => $save, "message" => "error"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Task::find($id);
        return $data ? $data : response()->json(["message", "Data not found"]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, string $id)
    {
        $newData = $request->all();
        $oldData = Task::findOrFail($id);

        // dd($newData);
        $user = JWTAuth::parseToken()->authenticate();


        if (!$oldData) {
            return response()->json(["status" => false, "message" =>  "data not found"]);
        }

        $oldData->title = $newData["title"];
        $oldData->description = $newData["description"];
        $oldData->status_id = $newData["status_id"];
        $oldData->assigned_to = $newData["assigned_to"];
        $oldData->update_by = $user->id;
        $oldData->updated_at = now();

        $save = $oldData->save();

        return $save
            ? response()->json(["success" => $save, "message" => "Data has been edited succesfully", "data" => $oldData])
            : response()->json(["success" => $save, "message" => "failed to edit the data"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Task::find($id);
        $user = JWTAuth::parseToken()->authenticate();
        // dd($user);

        if (!$data) {
            return response()->json(["message" => "Data not found", "success" => false]);
        }

        $data->deleted_at = now();
        $data->delete_by = $user->id;

        $save = $data->save();

        return $save ? response()->json(["success" => $save, "message" => "The task list has been deleted"])
            :  response()->json(["success" => $save, "message" => "The task list with " . $id . ' failed to deletd']);
    }
}
