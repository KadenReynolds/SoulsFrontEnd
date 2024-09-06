import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function GameBosses({token}) {
  const [bosses, setBosses] = useState([])
  const [game, setGame] = useState({})
  let bossRank = 1

  const navigate = useNavigate();
  const { gameID } = useParams();
  
  useEffect (() => {
    getGameByGameID();
    getBossesByGameIDInOrderOfLadela();
  }, [])

  // async function getBossesByGameID() {
  //   try {
  //     const response = await fetch(`https://soulsserver-production.up.railway.app/api/bosses/${gameID}`)
  //     const result = await response.json()

  //     console.log(result.bosses)

  //     setBosses(result.bosses)
  //   }
  //   catch(err){
  //     console.error(err.message)
  //   }
  // }

  async function getGameByGameID() {
    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/games/${gameID}`)
      const result = await response.json()

      console.log(result.game[0])

      setGame(result.game[0])
    }
    catch(err){
      console.error(err.message)
    }
  }

  async function getBossesByGameIDInOrderOfLadela(){
    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/bosses/${gameID}/ladela`)
      const result = await response.json()

      console.log(result.bosses)

      setBosses(result.bosses)
    }
    catch(err){
      console.error(err.message)
    }
  }

  async function deleteGame(game_id){
    try {
      await fetch(`https://soulsserver-production.up.railway.app/api/games/${game_id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
      })
      navigate('/catalog_games')
    }
    catch(err){
      console.error(err.message)
    }
  }

  async function deleteBoss(boss_id){
    try {
      await fetch(`https://soulsserver-production.up.railway.app/api/bosses/${boss_id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
      })
      // window.location.reload()
      navigate(`/catalog_games`)
    }
    catch(err){
      console.error(err.message)
    }
  }


  
  return (
    <>
      <h1>{game.name}</h1>
      {!token
        ?
        <></>
        :
        <>
          <button className="gameEditButton">i</button>
          <button className="gameDeleteButton" onClick={() => {deleteGame(game.game_id)}}>Delete Game</button>
        </>
      }
        <div className="bossGameMasterDiv">
          {bosses.map((boss) => {
            return(
                <div key={boss.boss_id} className="bossDiv">
                  <h3>#{bossRank++} {boss.name}</h3>
                  {!token
                    ?
                    <></>
                    :
                    <>
                      <button className="deleteBoss" onClick={() => {deleteBoss(boss.boss_id)}}>X</button>
                    </>
                  }
                  <img src={boss.boss_image} alt="Photo Not Available" />
                  <br />
                  <h5>Lore: <i>{boss.lore}</i></h5>
                  <h5>Appearence: <i>{boss.appearence}</i></h5>
                  <h5>Difficulty: <i>{boss.difficulty}</i></h5>
                  <h5>Entertainment: <i>{boss.entertainment}</i></h5>
                  <h5>Level: <i>{boss.level}</i></h5>
                  <h5>Annoyance: <i>{boss.annoyance}</i></h5>
                  <h4>LADELA: <i>{boss.ladela}</i></h4>
                  <p>"{boss.description}"</p>
                 </div>
            )
          })}
          {!token
            ?
            <></>
            :
            <button onClick={() => {navigate('/bosses/newboss')}}>+ Add New Boss</button>
          }
        </div>
    </>
  )
}