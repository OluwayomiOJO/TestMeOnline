<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\QuestionResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreQuestionRequest;

class QuestionController extends Controller
{


  public function store(Request $request)
  {
    $records = $request->input('quizes');

    $errors = [];

    foreach ($records as $key => $record) {
      // Validate each record
      $validator = Validator::make($record, [
        'quiz' => 'required|string|max:1000',
        'options' => 'required| array|size:4',
        'options' => 'required|array',
        'options.A' => 'required|string|max:255',
        'options.B' => 'required|string|max:255',
        'options.C' => 'required|string|max:255',
        'options.D' => 'required|string|max:255',
        'answer' => 'required|string',
        'user_id' => 'exists:users,id',
      ]);

      if ($validator->fails()) {
        $errors[$key] = $validator->errors();
      }
    }

    if (!empty($errors)) {
      return response()->json(['errors' => $errors], 422);
    }

    // Save records to the database
    foreach ($records as $record) {
      Question::create([
        'user_id' => auth()->id(),
        'quiz' => $record['quiz'],
        'answer' => $record['answer'],
        'options' => json_encode($record['options']),  // Save options as JSON
      ]);
    }

    return response()->json(['message' => 'Records saved successfully!'], 200);
  }

  public function index(Request $request)
  {

    $user = $request->user();
    return QuestionResource::collection(
      Question::where('user_id', $user->id)
        ->get()
    );
  }

  public function update(Request $request, $id)
  {
    // Find the record by ID
    $record = Question::findOrFail($id);

    // Validate the incoming data
    $validated = $request->validate([
      'quiz' => 'required|string|max:1000',
      'options' => 'required| array|size:4',
      'options' => 'required|array',
      'options.A' => 'required|string|max:255',
      'options.B' => 'required|string|max:255',
      'options.C' => 'required|string|max:255',
      'options.D' => 'required|string|max:255',
      'answer' => 'required|string',
      'user_id' => 'exists:users,id',
    ]);

    // Update the record with the validated data, including options
    $record->update($validated);

    // Return a success message or the updated record
    return response()->json(['message' => 'Record updated successfully', 'record' => $record], 200);
  }

  public function destroy($id)
  {
    // Find the record by ID and delete it
    $record = Question::findOrFail($id);
    $record->delete();

    // Return a response
    return response()->json(['message' => 'Record deleted successfully'], 200);
  }

  public function deleteRecordsByUser()
  {
    // Find all records that belong to the current user and delete them
    $deletedRecordsCount = Question::where('user_id', auth()->id())->delete();

    // Return a response with the number of deleted records
    return response()->json([
      'message' => 'All records deleted successfully',
      'deleted_count' => $deletedRecordsCount
    ], 200);
  }

  public function fetch_by_id($user_id)
  {
    return QuestionResource::collection(
      Question::where('user_id', $user_id)
        ->get()
    );
  }
}
