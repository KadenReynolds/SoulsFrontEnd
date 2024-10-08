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
      <h1>{game.title}</h1>
      {!token
        ?
        <></>
        :
        <>
          <button className="gameEditButton" onClick={() => {navigate(`/catalog_games/editgame/${game.game_id}`)}}>i</button>
          <button className="gameDeleteButton" onClick={() => {deleteGame(game.game_id)}}>Delete Game</button>
          <br />
          <br />
        </>
      }
        <div className="gameInfoDiv">
          <h4><i>"{game.description}"</i></h4>
          <hr />
          <h4>Build: <br /> <i>"{game.build_played}"</i></h4>
          <hr />
          <h4>Patch: <br /> <i>"{game.patch}"</i></h4>
        </div>
        <button onClick={() => {window.scrollTo(0, document.body.scrollHeight)}} className="buttonScroll">Scroll to Bottom</button>
        <h5 className="buttonNote">Note: Scrolling any further down will show you the bosses in Ascending order meaning you will see the #1 spot first, click this button to start at the worst boss</h5>
        <div className="bossGameMasterDiv">
          <h2 className="bossRankHeader">{game.name} Boss Ranking:</h2>
          {bosses.map((boss) => {
            return(
                <div key={boss.boss_id} className="bossDiv">
                  <h3>#{bossRank++} {boss.name}</h3>
                  {!token
                    ?
                    <></>
                    :
                    <>
                      <button className="editBoss" onClick={() => {navigate(`/bosses/editboss/${boss.boss_id}`)}}>i</button>
                      <button className="deleteBoss" onClick={() => {deleteBoss(boss.boss_id)}}>X</button>
                    </>
                  }
                  <img src={boss.boss_image} alt="Photo Not Available" />
                  <br />
                  <h5>Lore: <i>{boss.lore}</i></h5>
                  <h5>Appearance: <i>{boss.appearence}</i></h5>
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
            <button className="newBossBtn"><a href="/bosses/newboss">+ Add New Boss</a></button>
          }
        </div>
    </>
  )
}