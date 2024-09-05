import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login ({setToken}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const login = async () => {
    localStorage.clear();
    try {
      const response = await fetch('https://soulsserver-production.up.railway.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const result = await response.json();
      console.log(result.token)
      if(result.token === undefined){
        setError("Error Occured")
      } else{
        localStorage.setItem("token", `${result.token}`);
        console.log("Hello")
        setToken(result.token)
        navigate('/')
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
      setError(err.name)
      console.log
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  }

  return (
    <div className="formDiv">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>*Note: This login is for admins only, if you are not an admin you cannot log in.</p>
        {error !== "" ? <p id="formError">Username/Password is not correct</p> : <p></p>}
        <label htmlFor="username">
          Username:
        </label>
        <br />
        <input type="text" placeholder="Enter Username" className="formInputs" onChange={handleUsername} required/>
        <br />
        <br />
        <label htmlFor="password">
          Password:
        </label>
        <br />
        <input type="password" placeholder="Enter Password" className="formInputs" onChange={handlePassword} required/>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}