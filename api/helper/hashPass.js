import bcrypt from "bcryptjs";

export const hashPass = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

export const wrongPassword = (input, password) => {
  return !bcrypt.compareSync(input, password);
};
