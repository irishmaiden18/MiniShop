import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {

    // loginWithRedirect - Auth0's login function
    const {loginWithRedirect}= useAuth0()

  return (
    <>
        <button 
          onClick={loginWithRedirect}
          className="bg-[#D2B48C] px-3 py-1 ml-2 lg:ml-3 rounded-md text-black"
        >
          Login
        </button>
    </>
  )
}

export default LoginButton