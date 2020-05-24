## Technology
Laravel Framework 7.6.2
JAMStack

## Start Backend Server
php artisan serve --host=kestrel.test --port=8081

## Start Frontend Server
npm start

## Seed Database
php artisan migrate:fresh --seed

## Developer Environment Setup
- Install Composer
- Install Node JS
- Install Laravel 7.6+

## Frontend Config
https://kryogenix.org/code/dont-need-that-js/
https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145
https://github.com/CharlesStover/optimal-react-file-structure/tree/master/src

### NPM Dependencies
- @babel/runtime: meant to be used as a runtime dependency along with the Babel
  plugin @babel/plugin-transform-runtime
- bootstrap: CSS framework
- gsap: Used to animate the slides on presenter screen
- jquery: Used by blueimp, bootstrap, scripts

### NPM Dev Dependencies
- @babel/core: Converting modern JS to backwards compatible
  - @babel/plugin-transform-runtime: (dependency to @babel/runtime) Enables the
    re-use of Babel's injected helper code to save on codesize
  - @babel/preset-env: (dependency to babel) Preset that allows the latest
    JavaScript without needing to micromanage which syntax transforms are needed
  - babel-loader: (dependency to babel) Load JS files into Babel
- @fortawesome/fontawesome-free: Font icons
- autoprefixer: Add CSS prefixes automatically
- clean-webpack-plugin: Clear out an output folder before outputting build files
- css-loader: Interprets @import and @url() and resolves them. Translates CSS into CommonJS modules
- eslint: To lint JavaScript code
- eslint-plugin-import: ??? part of eslint
- file-loader: Load other misc file types
- mini-css-extract-plugin: Extracts our CSS out of the JavaScript bundle into a separate file
- node-sass: Provides binding for Node.js to LibSass, a Sass compiler.
- postcss-loader: Run postcss actions
- prettier: Linting
- sass-loader: Compiles Sass to CSS
- style-loader: Inject CSS to page
- typescript: Typescript
- ts-loader: Typescript
- webpack: Webpack
- webpack-cli: Webpack

## Database
- Users
- With buckets set for each user, so each user can login and have access to their specific videos

## Notes
TODO: Save TMDB ids for each movie to pull up accurate covers.
https://developers.themoviedb.org/3/getting-started/images
https://www.themoviedb.org/documentation/api
https://developers.themoviedb.org/3/search/search-movies

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