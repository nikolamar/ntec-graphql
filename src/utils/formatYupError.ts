import { ValidationError } from 'yup';

export function formatYupError(err: ValidationError) {
  const errors: Array<{path: string, message: string}> = [];
  err.inner.forEach(element => {
    errors.push({
      path: element.path,
      message: element.message
    });
  });
  return errors;
}