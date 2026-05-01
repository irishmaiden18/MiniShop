import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import { PersonCircle } from "react-bootstrap-icons"

const ProfileImage = () => {

    const {user} = useAuth0()
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        return <PersonCircle color="royalblue" size={50}/>
    }

  return (
    <>
        <img src={user.picture} alt={`${user.name} pic`} width={50} onError={() => (setHasError(true))}/>
    </>
  )
}

export default ProfileImage