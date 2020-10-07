import validate from 'validate.js/validate';
import moment from 'moment';
import { isEmpty, reduce, first, get } from 'lodash';

validate.validators.array = (arrayItems, itemConstraints, key, attributes) => {
  //console.log(arrayItems)
  const arrayItemErrors = reduce(
    arrayItems,
    (errors, itemObject, index) => {
      const field = first(Object.keys(itemConstraints));
      const item = get(itemObject, field);
      const newItem = { [field]: item };
      //  console.log(itemConstraints)
      //  console.log('newItem',newItem)
      const error = validate(newItem, itemConstraints);
      const itemError = first(get(error, field));
      if (error) return [...errors, { [field]: itemError }];
      return errors;
    },
    [],
  );
  return isEmpty(arrayItemErrors) ? null : arrayItemErrors;
};

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    if (!moment.utc(value).isValid()) return '';
    return value !== ''
      ? +moment.utc(value)
      : options.dateOnly
      ? 'YYYY-MM-DD'
      : 'YYYY-MM-DD hh:mm:ss';
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    if (!moment.utc(value).isValid()) return '';

    return value !== '' ? moment.utc(value).format(format) : '';
  },
});
