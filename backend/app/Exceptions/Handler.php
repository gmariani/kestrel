<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof NotFoundHttpException && $request->wantsJson()) {
            // dd($exception);
            return response()->json(['message' => 'Route Not Found!'], 404);
        }

        if ($exception instanceof MethodNotAllowedHttpException && $request->wantsJson()) {
            // dd($exception);
            return response()->json(['message' => 'Method Not Allowed!'], 405);
        }

        if ($exception instanceof ModelNotFoundException && $request->wantsJson()) {
            // dd($exception);
            //return response()->json(['message' => $exception->getMessage()], 404);
            return response()->json(['message' => 'Not Found!'], 404);
        }

        return parent::render($request, $exception);
    }
}
