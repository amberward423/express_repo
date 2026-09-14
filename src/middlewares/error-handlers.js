import {validationResult} from 'express-validator';

const notFoundHandler = (req, res, next) => {

const error = new Error(`Not Found - ${req.originalUrl}`);
error.status =  404;
next(error);
}

const errorHandler = (err,req,res) => {
    const status = err.status || 500
   res.status(status).json({message: err.message , status:status})
};

const validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation error');
    error.status = 400;
    error.errors = errors.array();
    next(error);
  } else {
    next();
  }
};

export {notFoundHandler, errorHandler, validationErrors};