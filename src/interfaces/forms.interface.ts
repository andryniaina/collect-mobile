export interface FormField {
  type: string;
  name: string;
  _id: string;
}

export interface Form {
  _id: string;
  version: string;
  name: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}
