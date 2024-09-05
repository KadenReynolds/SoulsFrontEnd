import {useNavigate} from 'react-router-dom'

export default function Home({token}) {
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path)
  }
  return(
    <>
      <h1>Welcome</h1>
      <button onClick={() => {handleClick('/catalog_games')}}>Games</button>
      {!token
        ?
        <button onClick={() => {handleClick('/login')}}>Admin Login</button>
        :
        <></>
      }
    </>
  )
}