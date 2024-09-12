import { useState, useEffect } from "react"

export default function Awards () {
  const [games, setGames] = useState([{}])
  const [bossID, setBossID] = useState(1)
  const [bossesBB, setBossesBB] = useState([{
    status: "",
    name:""
  }])

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
    
        console.log(result)
        if(result[0].title === "BloodBorne"){
          setBossesBB(result)
        }
      }
      catch(err){
        console.error(err.message)
      }
  }
  
  return (
    <>        
      {/* {console.log(bossesBB[0].title)} */}
      <div><h1>Worst boss in {bossesBB[0].title} goes to... {bossesBB[0].name}</h1></div>     
      <div><h1>Best boss in {bossesBB[1].title} goes to... {bossesBB[1].name}</h1></div> 
    </>
  )
}