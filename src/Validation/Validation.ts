import {validCardExpiry, validEmail, validPassword} from '../RegExp/RegExp';

// Define possible validation types
export type ValidationType =
  | 'email'
  | 'phone'
  | 'password'
  | 'rating'
  | 'cvv'
  | 'cardNumber'
  | 'zipcode'
  | 'required'
  | 'cardExpiry';

const validate = (
  value: string | undefined | null,
  validationType?: ValidationType,
): boolean => {
  if (!value) return false;

  switch (validationType) {
    case 'email':
      return validEmail.test(value) ? true : false;

    case 'password':
      return validPassword.test(value) ? true : false;

    case 'phone':
      return value.length == 10 ? true : false;

    case 'cvv':
      return value.length == 3 ? true : false;

    case 'cardNumber':
      return value.length == 16 ? true : false;

    case 'zipcode':
      return value.length == 6 ? true : false;

    case 'rating':
      return Number(value) <= 5 && Number(value) > 0 ? true : false;

    case 'cardExpiry':
      return validCardExpiry.test(value) ? true : false;

    case 'required':
      return value.trim() !== '' ? true : false;

    default:
      return value.trim() !== '' ? true : false;
  }
};

export default validate;
