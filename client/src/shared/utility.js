import Joi from 'joi-browser';

export const updateObject = (state, props) => {
  return {
    ...state,
    ...props,
  };
};

export const checkPostArtValidity = (form) => {
  const schema = {
    caption: Joi.string()
      .required()
      .min(1)
      .max(255)
      .error(() => {
        return { message: 'Caption is too long' };
      }),
    image: Joi.string()
      .required()
      .min(4)
      .max(255)
      .error(() => {
        return { message: "Image's name is too long" };
      }),
  };
  const options = {
    abortEarly: false,
  };
  return Joi.validate(form, schema, options);
};

export const checkValidity = (value, controlName) => {
  let isValid = false;
  let trimValue = value.trim().toLowerCase();
  switch (controlName) {
    case 'email':
    case 'password':
    case 'changeEmail':
    case 'changePassword':
      isValid = trimValue.length > 5;
      break;
    case 'username':
    case 'changeUsername':
      isValid = /[a-z]+/gi.test(trimValue) && trimValue.length > 2;
      break;
    case 'image':
      isValid =
        trimValue.length &&
        (trimValue.endsWith('.jpg') ||
          trimValue.endsWith('.png') ||
          trimValue.endsWith('.jpeg'));
      break;
    case 'caption':
      isValid = trimValue.length > 0;
      break;
    default:
      isValid = true;
      break;
  }
  return isValid;
};
