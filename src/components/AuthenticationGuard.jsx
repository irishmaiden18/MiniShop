import { withAuthenticationRequired } from "@auth0/auth0-react"

const AuthenticationGuard = (props) => {
    // AuthenticationGuard allows us to protect our pages by making it so the user has to be logged in to view them
    // we pass in a component we want to protect as props
    // and then we use withAuthenticationRequired and pass in that component to create our new ProtectedComponent
    const ProtectedComponent = withAuthenticationRequired(props.component)

    return <ProtectedComponent/>
}

export default AuthenticationGuard