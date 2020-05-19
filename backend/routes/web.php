<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resources([
    // To view an image
    //'/view' => 'MediaController',

    // To listen to an audio file
    //'/listen' => 'AudioController',

    // To actually watch a video
    '/watch' => 'VideoController',
]);

Auth::routes(['verify' => true]);

// Show gallery of videos available
Route::get('/dashboard', 'HomeController@index')->name('dashboard');

// TODO: Allows you to configure where it's pulling videos from eventually
Route::get('/settings', 'Settings\AccountController@index')->name('settings');
Route::get('/account', 'Settings\AccountController@index');

Auth::routes();
