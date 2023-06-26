
import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password is too short - should be 8 chars minimum.')
        .required('Required'),

});