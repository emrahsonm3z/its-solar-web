const isEmpty = value => value === undefined || value === null || value === "";
const join = rules => (value, data, params) =>
  rules.map(rule => rule(value, data, params)).filter(error => !!error)[0];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (
    !isEmpty(value) &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return "Invalid email address";
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return "Required";
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return "Must be an integer";
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!enumeration.includes(value)) {
      return `Must be one of: ${enumeration.join(", ")}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return "Do not match";
      }
    }
  };
}

export function validator(rules, params) {
  const errors = {};

  Object.keys(rules).forEach(key => {
    const rule = join([].concat(rules[key]));
    const error = rule(params[key]);

    if (error) {
      errors[key] = error;
    }
  });

  return errors;
}
