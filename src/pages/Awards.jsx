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
        const response = await fetch(`http://localhost:3000/api/bosses/${game_Id}/gamebosses/ladela`)
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
      <div className="awardMasterDiv">
        <div className="awardBossDiv"><h3># Worst boss in {bbWorstBoss.title} goes to... <br /><u>{bbWorstBoss.name}</u></h3></div>     
        <div className="awardBossDiv"><h3># Best boss in {bbBestBoss.title} goes to... <br /><u>{bbBestBoss.name}</u></h3></div> 
      </div>
    </>
  )
}