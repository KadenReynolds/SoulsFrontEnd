import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


export default function Games_Catalog({token}) {
  const [ games, setGames ] = useState([{}]);
  const [ clickDelete, setClickDelete] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    fetchGames()
    window.scrollTo(0,0)
  },[])

  async function fetchGames(){

    let API = '/api'

    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/games`)
      const result = await response.json()

      console.log(result.games)

      setGames(result.games)
    }
    catch(err){
      console.error(err.message)
    }
  }

  // async function deleteGame(game_id){
  //   try {
  //     await fetch(`http://soulsserver-production.up.railway.app/api/games/${game_id}`, {
  //       method: 'DELETE',
  //       headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //       }
  //     })
  //     window.location.reload();
  //   }
  //   catch(err){
  //     console.error(err.message)
  //   }
  // }

  // function handleDeleteClick (game_id){
  //   setClickDelete(true)
  //   deleteGame(game_id)
  // }

  function handleClickNavigate(path){
    if (clickDelete === false){
      navigate(`/bosses/${path}`)
    } else {
      return 
    }
  }

  return (
    <>
      <h1>Games</h1>
      <div className="gameMasterDiv">
        {games.map((game) => {
          return(
            <>
              <div className="gameDiv" key={game.game_id} onClick={() => {handleClickNavigate(game.game_id)}}>
                <img src={game.game_image} alt="Image Not Available"/>
                <div>
                  <h3 className="gameName">{game.name}</h3>
                </div>
                {/* {!token
                  ?
                  <></>
                  :
                  <>
                    <button className="gameEditButton">i</button>
                    <button className="gameDeleteButton" onClick={() => {handleDeleteClick(game.game_id)}}>X</button>
                  </>
                } */}
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}