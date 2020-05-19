<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Media;
use Faker\Generator as Faker;

$factory->define(Media::class, function (Faker $faker) {
    return [
        's3_key' => $faker->url,
        'name'    => implode(' ', $faker->words(3)),
        'thumbnail_url' => $faker->url,
        'media_url' => $faker->url,
        'metadata' => json_encode(['type' => $faker->fileExtension, 'year' => $faker->year]),
        //'user_id' => factory(User::class)
    ];
});
