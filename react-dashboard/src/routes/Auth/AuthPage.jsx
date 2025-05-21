import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'

const AuthPage = () => {
const [switchPages, setSwitchPages] = useState("login")

  return (
<>

{switchPages === "login" ?
 <Login switchPages={setSwitchPages}/> :
  switchPages === "register" ? 
  <Register switchPages={setSwitchPages} /> : 
  null}
</>
  )
}

export default AuthPage