import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

const LoginPage = ({ form }) => {

    return (
        <>
            {
                form === 'login' ?
                    <LoginForm />
                    :
                    <SignupForm />
            }
        </>
    )
}

export default LoginPage