export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const validateForm = (fields:any, formData:any) => {
  const errors :any = {};
  fields.forEach((field:any) => {
    if (field.required && !formData[field.name]) {
      errors[field.name] = "This field is required";
    }
    if (field.validation) {
      const { comparator, value, message } = field.validation;
      const fieldValue = formData[field.name];
      switch (comparator) {
        case "=":
          if (fieldValue !== value) {
            errors[field.name] = message || `Value must be equal to ${value}`;
          }
          break;
        // Ajoutez d'autres comparateurs si nécessaire
        default:
          break;
      }
    }
  });
  return errors;
};

export const checkConditions = (conditions:any, formData:any) => {
  for (const condition of conditions) {
    const { field, comparator, value } = condition;
    if (comparator === "=" && formData[field] !== value) {
      return false;
    }
  }
  return true;
};


