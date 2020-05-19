<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    protected $fillable = ['s3_key', 'name', 'thumbnail_url', 'metadata'];
    protected $appends = ['url'];

    // TODO: at a later point add profiles
    /*public function profile()
    {
        return $this->belongsTo(Profile::class);
    }*/
    public function getUrlAttribute()
    {
        /** @var \Illuminate\Filesystem\FilesystemAdapter $fs */
        $fs = Storage::disk('s3');
        /** @var \League\Flysystem\Filesystem $driver */
        $driver = $fs->getDriver();
        /** @var \League\Flysystem\AwsS3v3\AwsS3Adapter $adapter */
        $adapter = $driver->getAdapter();
        /** @var \Aws\S3\S3Client $client */
        $client = $adapter->getClient();

        // Public URL
        //return $fs->url($this->s3_key);

        // Signed URL
        // https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/s3-presigned-url.html
        $expires = '+30 minutes';
        $command = $client->getCommand('GetObject', [
            'Bucket' => $adapter->getBucket(),
            'Key'    => $adapter->getPathPrefix() . $this->s3_key,
        ]);
        $request = $client->createPresignedRequest($command, $expires);
        return (string) $request->getUri();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function userMedia()
    {
        // https://laravel.com/docs/7.x/filesystem
        // $contents = Storage::get('file.jpg');
        // $url = Storage::url('file.jpg');
        // $url = Storage::temporaryUrl(
        //     'file.jpg', now()->addMinutes(5)
        // );
        // https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html#RESTObjectGET-requests
        // $exists = Storage::disk('s3')->exists('file.jpg');
        // $missing = Storage::disk('s3')->missing('file.jpg');
        // This statement will fetch all files present under pdf folder.
        //Storage::disk('s3')->files('pdf');
        // Storage::disk('s3')->files('pdf');
        return self::where('user_id', auth()->id())->orderBy('name', 'asc')->pluck('name', 'id');
    }

    /*public static function userVideos()
    {
        // TODO: Add column that specifies if it's a video, image or audio
        return self::where('user_id', auth()->id())->orderBy('name', 'asc')->pluck('name', 'id');
    }

    public static function userVideo($id)
    {
        // TODO: Add column that specifies if it's a video, image or audio
        return self::where('user_id', auth()->id())->where('id', $id);
    }*/
    //
}
