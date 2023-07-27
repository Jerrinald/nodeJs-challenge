const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");


const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
},
filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
}
});
const upload = multer({ storage }).single('uploaded_file')


module.exports = (req, res, next) => {
    try {
        if (req.method === 'PATCH' && req.get('Content-Type').startsWith('multipart/form-data')) {
          // Use uplImageMulter as middleware, passing req and res objects
          upload(req, res, (err) => {
            if (err) {
              return next(err); // Handle any errors from the uplImageMulter middleware
            }
    
            // The uploaded file is available in req.file.path after the middleware is executed
            console.log(req.file);
            req.body.image = req.file.path;
    
            // Continue with your other logic here
            // ...
    
            // Call next to proceed to the next middleware or route handler
            next();
          });
        } else {
          // For other HTTP methods, no file upload is expected, so simply call next
          next();
        }
      } catch (err) {
        console.log(err);
        return next(new UnauthorizedError());
      }
};