import joiToSwagger from "joi-to-swagger";

export const convertJoi = (schema: any) => {
  const { swagger } = joiToSwagger(schema);
  return swagger;
};
