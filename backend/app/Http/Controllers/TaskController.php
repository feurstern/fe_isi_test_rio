<?php

namespace App\Http\Controllers;

use App\Http\Controllers\auth\AuthController;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\TaskLog;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return  DB::table('tasks as t')
            ->leftJoin('users as u1', 'u1.id', '=', 't.create_by')
            ->leftJoin('users as u2', 'u2.id', '=', 't.assigned_to')
            ->leftJoin('users as u3', 'u3.id', '=', 't.update_by')
            ->leftJoin('statuses as s', "s.id", "=", "t.status_id")
            ->select(
                't.id as id',
                't.title as title',
                't.description as description',
                't.status_id as status_id',
                't.assigned_to as assigned_to',
                'u1.name as created_by_name',
                'u2.name as assigned_to_name',
                'u3.name as updated_by_name',
                "s.name as status",
                't.created_at as created_at',
                't.updated_at as updated_at',
            )
            ->whereNull('t.deleted_at')
            ->get();
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


        // return $data;
        $task = new Task();

        $assigned_user = User::find($data['assigned_to']);
        

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

        $newData = $task;

        $newData->assigned_to_name = $assigned_user->name;
        $newData->created_by_name = $user->name;
        $newData->update_by = null;


        return $save ? response()->json(["success" => $save, "data" => $task]) : response()->json(["success" => $newData, "message" => "error"]);
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
 
        $data = $oldData;

        $created_by = User::find($oldData->create_by);
        $assigned_user = User::find($newData['assigned_to']);

        $data->update_by = $user->name;
        $data->create_by = $created_by->name;
        $data->assigned_to_name  = $assigned_user->name;



        return $save
            ? response()->json(["success" => $save, "message" => "Data has been edited succesfully", "data" => $data])
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
