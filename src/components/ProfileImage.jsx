import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import { PersonCircle } from "react-bootstrap-icons"

const ProfileImage = () => {

    const {user} = useAuth0()
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        return <PersonCircle color="white" size={25}/>
    }

  return (
    <>
        <img src={user.picture} alt={`${user.name} pic`} width={25} className="rounded-full" onError={() => (setHasError(true))}/>
    </>
  )
}

export default ProfileImage