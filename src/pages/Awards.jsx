import { useState, useEffect } from "react"

export default function Awards () {
  const [games, setGames] = useState([{}])
  const [bossID, setBossID] = useState(1)
  const [bbBestBoss, setBBBestBoss] = useState({})
  const [bbWorstBoss, setBBWorstBoss] = useState({})

  useEffect(() => {
    fetchGames()
  }, [])

  async function fetchGames(){

    let API = '/api'

    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/games`)
      const result = await response.json()

      setGames(result.games)
      getBossesAndGameNameByGameIDInOrderOfLadela(result.games[0].game_id)
    }
    catch(err){
      console.error(err.message)
    }
  }

  async function getBossesAndGameNameByGameIDInOrderOfLadela(game_Id){
      try {
        const response = await fetch(`https://soulsserver-production.up.railway.app/api/bosses/${game_Id}/gamebosses/ladela`)
        const result = await response.json()

        if(result[0].title === "BloodBorne"){
          setBBBestBoss(result[0])
          setBBWorstBoss(result[1])
        }
      }
      catch(err){
        console.error(err.message)
      }
  }
  
  return (
    <>        
      {console.log(bbBestBoss)}
      {console.log(bbWorstBoss)}
      <h1>Awards</h1>
      <div className="awardMasterDiv">
        <h1 className="awardGameHeader">{bbWorstBoss.title}</h1>
        <hr />
        <div className="awardBossDiv">
          <h2><u># Worst boss in {bbWorstBoss.title} goes to...</u></h2>
          <h3>{bbWorstBoss.name}</h3>
          <img src={bbWorstBoss.boss_image} alt="" />
        </div>     
        <div className="awardBossDiv">
          <h2><u># Best boss in {bbBestBoss.title} goes to...</u></h2>
          <h3>{bbBestBoss.name}</h3>
          <img src={bbBestBoss.boss_image} alt="" />
        </div>
        <hr /> 
      </div>
    </>
  )
}