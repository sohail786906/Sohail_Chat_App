// Error handler middleware
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Server Error',
    });
  };
  
  // Middleware to handle 404 errors (route not found)
  exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  