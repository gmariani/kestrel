<?php

use App\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('v1/media', 'MediaController@index');
Route::get('v1/media/{media:id}', 'MediaController@get');
// Route::get('media/images', 'MediaController@getImages');
// Route::get('media/images/{media}', 'MediaController@getImage');
// Route::get('media/audios', 'MediaController@getAudios');
// Route::get('media/audios/{media}', 'MediaController@getAudio');
// Route::get('media/videos', 'MediaController@getVideos');
// Route::get('media/videos/{media}', 'MediaController@getVideo');

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
