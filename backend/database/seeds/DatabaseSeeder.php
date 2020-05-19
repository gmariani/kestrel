<?php

use App\User;
use App\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create 5 sample users
        $users = factory(User::class, 5)->create();

        // $fs API
        // https://laravel.com/api/7.x/Illuminate/Filesystem/FilesystemAdapter.html
        /** @var \Illuminate\Filesystem\FilesystemAdapter $fs */
        $fs = Storage::disk('s3');
        $files = $fs->allFiles('');

        foreach ($files as $file) {
            // Assign all to first user for now
            $user = 1;
            // Grab file name without extension as a default, this should be able
            // to be changed later in the GUI
            $name = pathinfo($file, PATHINFO_FILENAME);
            $size = $fs->size($file);
            $last_modified = $fs->lastModified($file);
            $mime_type = $fs->mimeType($file);
            Media::updateOrCreate(['s3_key' => $file], [
                'user_id' => $user,
                'name' => $name,
                'metadata' => json_encode([
                    //'type' => pathinfo($file, PATHINFO_EXTENSION),
                    'mime_type' => $mime_type,
                    'size' => $size,
                    'last_modified' => $last_modified,
                ]),
            ]);
        }
    }
}
