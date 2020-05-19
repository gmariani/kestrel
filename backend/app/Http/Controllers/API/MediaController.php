<?php

namespace App\Http\Controllers;

use App\Media;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{

    public function __construct()
    {
        //$this->middleware(['auth', 'verified']);
    }

    public function index_raw()
    {
        /** @var \Illuminate\Filesystem\FilesystemAdapter $fs */
        $fs = Storage::disk('s3');
        /** @var \League\Flysystem\Filesystem $driver */
        $driver = $fs->getDriver();
        /** @var \League\Flysystem\AwsS3v3\AwsS3Adapter $adapter */
        $adapter = $driver->getAdapter();
        /** @var \Aws\S3\S3Client $client */
        $client = $adapter->getClient();
        $bucket = $adapter->getBucket();
        $files = $client->listObjectsV2([
            'Bucket' => $bucket
        ]);

        dd($files);
        return $files;
    }

    public function index()
    {
        return Media::all();
    }

    public function get($id)
    {
        //return $media;
        /*if (Media::where('id', $id)->exists()) {
            $media = Media::where('id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($media, 200);
        } else {
            return response()->json([
                "message" => "Media not found"
            ], 404);
        }*/

        return Media::findOrFail($id);
    }

    /*public function getImages(Media $media)
    {
        return $media;
    }

    public function getImage(Media $media)
    {
        return $media;
    }

    public function getAudios(Media $media)
    {
        return $media;
    }

    public function getAudio(Media $media)
    {
        return $media;
    }

    public function getVideos(Media $media)
    {
        return $media;
    }

    public function getVideo(Media $media)
    {
        return $media;
    }*/
}
