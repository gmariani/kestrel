## Technology
Laravel Framework 7.6.2
JAMStack

## Start Server
php artisan serve --host=kestrel.test --port=8080

## Seed Database
php artisan migrate:fresh --seed

## Developer Environment Setup
- Install Composer
- Install Node JS
- Install Laravel 7.6+

## Database
- Users
- With buckets set for each user, so each user can login and have access to their specific videos

## Notes
required settings for a user:
    s3 bucket
    aws key
    aws secret

required settings for a profile:
    s3 prefix

### Troubleshooting

#### SSL certificate problem
```
Error executing "ListObjects" on "https://mariani-movies.s3.amazonaws.com/?prefix=&encoding-type=url"; AWS HTTP error: cURL error 60: SSL certificate problem: unable to get local issuer certificate (see https://curl.haxx.se/libcurl/c/libcurl-errors.html)
```

Download this file http://curl.haxx.se/ca/cacert.pem and save it to the root of the project. Then add the `http` property to the `s3` driver config in `config/filesystems.php` like in the following example:
```
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    'http' => ['verify' => base_path('cacert.pem')]
],
```