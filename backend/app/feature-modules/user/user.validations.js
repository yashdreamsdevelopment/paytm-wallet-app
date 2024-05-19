const zod = require("zod");

const signupBodySchema = zod
  .object({
    userName: zod
      .string()
      .min(3, "Email must be greater than 3 characters")
      .max(30, "Email should not extend more than  30 characters")
      .email("Please enter a valid email"),
    firstName: zod
      .string()
      .min(3, "First name should be more than 3 characters")
      .max(50, "First name must not exceeds 50 characters"),
    lastName: zod
      .string()
      .min(3, "Last name should be more than 3 characters")
      .max(50, "Last name must not exceeds 50 characters"),
    password: zod
      .string()
      .min(6, "Password length must be greater than 6 characters"),
  })
  .required();

const signinBodySchema = signupBodySchema.pick({
  userName: true,
  password: true,
});

const updateBodySchema = signupBodySchema
  .omit({ userName: true })
  .partial()
  .refine(
    (data) => {
      const keys = Object.keys(data);
      return keys.length > 0;
    },
    { message: "At least One field must be provided" }
  );

module.exports = {
  signupBodySchema,
  signinBodySchema,
  updateBodySchema,
};
