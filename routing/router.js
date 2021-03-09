const LANDING = require('./routes/LANDING');
const APP = require('./routes/APP');
const MISS = require('./routes/MISS');

const router = (endpoint, method, contentType, data) => {
  switch (endpoint) {
    case ('/'):
      switch (method) {
        case ('GET'):
                return LANDING(contentType);
        default:
                return                 MISS(contentType);
      }
    case ('/dist/bundle.js'):
      switch (method) {
        case ('GET'):
                return APP(contentType);
        default:
                return                 MISS(contentType);
      }
    default:
                return                 MISS(contentType);
  }
}

module.exports = router;