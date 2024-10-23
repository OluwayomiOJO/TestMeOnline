<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuestionController;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/dashboard', [QuestionController::class, 'index']);
    Route::delete('questions', [QuestionController::class, 'deleteRecordsByUser']);
    Route::apiResource('/question', QuestionController::class); // takes care of store, delete , and update methods authomatically 
});


Route::get('/questions/fetch_by_id/{user_id}', [QuestionController::class, 'fetch_by_id']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Route::get('/test', function () {
//     return response()->json(['message' => 'API working']);
// });
