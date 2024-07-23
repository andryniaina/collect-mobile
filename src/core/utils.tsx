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
  });
  return errors;
};

export const checkConditions = (conditions:any, formData:any) => {
  for (const condition of conditions) {
    const { field, comparator, value } = condition;
    if (comparator === "=" && formData[field] !== value) {
      console.log("False");
      return false;
    }
  }
  console.log("True");
  return true;
};


