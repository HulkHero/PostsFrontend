import * as Yup from "yup"

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string()

        .email("Invalid email")
        .required("Required"),
    password: Yup.string()
        .min(6, "Password is too short - should be 6 chars minimum.")
        .required("Required"),

})