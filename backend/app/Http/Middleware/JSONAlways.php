<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

// https://gist.github.com/meSingh/c90c5abc81a9cc0687a62a84eb2c696b
class JSONAlways
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}
