
// Mongoose error will handle into my custom error below
export const handlemongooseerror = (err) => {
 const erorsources = err.errors.name.message;
  const statusCode = 400;
  const message = 'validation failed ';
  return {
    statusCode,
    message,
    erorsources
  };
};
