import React from 'react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

const LoginPage = ({ form }) => {

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h1 style={{ display: 'inline', margin: '0px' }}>Commit</h1>
                <h2>Nutrition</h2>
            </div>
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
