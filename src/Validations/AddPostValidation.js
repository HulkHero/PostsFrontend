import * as Yup from "yup";

export const AddPostValidation = Yup.object().shape({
    heading: Yup.string().required("Heading is required").min(5, "Heading must be at least 5 characters"),
    caption: Yup.string().required("Content is required").min(10, "Caption must be at least 10 characters"),
});