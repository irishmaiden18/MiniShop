import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {

    const {logout} = useAuth0()

    return (
        <>
            <button 
                onClick={() => {
                        logout({logoutParams: {returnTo: window.location.origin}})
                    }}
                className="bg-[#D2B48C] px-3 py-1 ml-2 lg:ml-3 rounded-md text-black"
                >

                Logout
            </button>
        </>
    )
}

export default LogoutButton