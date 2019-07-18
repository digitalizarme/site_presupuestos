import validate from 'validate.js';
import moment from 'moment';

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return value !== 'Invalid date'
      ? +moment.utc(value)
      : options.dateOnly
      ? 'YYYY-MM-DD'
      : 'YYYY-MM-DD hh:mm:ss';
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return value !== 'Invalid date' ? moment.utc(value).format(format) : false;
  },
});
