export const isError = () => {
  return process.env.NODE_ENV !== "production";
};

export const error = (err: string) => {
  if (isError()) {
    console.error(err);
  }
};
