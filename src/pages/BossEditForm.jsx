import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function BossEditForm({token}) {
  const [boss, setBoss] = useState({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [game_id, setGame_ID] = useState(0)
  const [game_rank, setGame_Rank] = useState(0)
  const [overall_rank, setOverall_Rank] = useState(0)
  const [lore, setLore] = useState(0)
  const [appearence, setAppearance] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [entertainment, setEntertainment] = useState(0)
  const [level, setLevel] = useState(0)
  const [annoyance, setAnnoyance] = useState(0)

  const navigate = useNavigate();
  const {bossID} = useParams();

  useEffect (() => {
    getBossByID();
  }, [])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleImage = (e) => {
    setImage(e.target.value)
  }

  const handleID = (e) => {
    setGame_ID(e.target.value)
  }

  const handleGameRank = (e) => {
    setGame_Rank(e.target.value)
  }

  const handleOverallRank = (e) => {
    setOverall_Rank(e.target.value)
  }

  const handleLore = (e) => {
    setLore(e.target.value)
  }

  const handleAppearance = (e) => {
    setAppearance(e.target.value)
  }

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value)
  }

  const handleEntertainment = (e) => {
    setEntertainment(e.target.value)
  }

  const handleLevel = (e) => {
    setLevel(e.target.value)
  }

  const handleAnnoyance = (e) => {
    setAnnoyance(e.target.value)
  }

  const getBossByID = async() => {
    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/bosses/${bossID}`)
      const result = await response.json()

      console.log(result[0].name)

      setBoss(result[0])
      setName(result[0].name)
      setDescription(result[0].description)
      setImage(result[0].boss_image)
      setGame_ID(result[0].game_id)
      setGame_Rank(result[0].game_rank)
      setOverall_Rank(result[0].overall_rank)
      setLore(result[0].lore)
      setAnnoyance(result[0].annoyance)
      setDifficulty(result[0].difficulty)
      setEntertainment(result[0].entertainment)
      setLevel(result[0].level)
      setAppearance(result[0].appearence)
    }
    catch(err){
      console.error(err.message)
    }
  }

  const setEditBoss = async() => {
    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/bosses/${bossID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          boss_image: image,
          game_id: Number(game_id),
          game_rank: Number(game_rank),
          overall_rank: Number(overall_rank), 
          lore: Number(lore), 
          annoyance: Number(annoyance), 
          difficulty: Number(difficulty), 
          entertainment: Number(entertainment), 
          level: Number(level), 
          appearence: Number(appearence)
        })
      });
      console.log(response)
      navigate('/catalog_games')
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    setEditBoss();
  }


  return(
    <>
      {!token 
        ?
        <></>
        :
        <div className="bossFormDiv">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Edit Boss</h2>
            <p>*Note: This form edits a existing boss and will calculate ladela</p>
            <label htmlFor="name">
              Name:
            </label>
            <br />
            <input type="text" placeholder="Enter Name" className="formInputs" onChange={handleName} defaultValue={boss.name}/>
            <br />
            <br />
            <label htmlFor="desc">
              Description:
            </label>
            <br />
            <textarea type="textarea" placeholder="Enter Descritpion" className="formInputs" onChange={handleDescription} defaultValue={boss.description}/>
            <br />
            <br />
            <label htmlFor="image">
              Image:
            </label>
            <br />
            <input type="text" placeholder="Enter Image URL" className="formInputs" onChange={handleImage} required defaultValue={boss.boss_image}/>
            <br />
            <br />
            <label htmlFor="game_id">
              Game_ID:
            </label>
            <br />
            <input type="number" placeholder="Enter Game_ID" className="formInputs" onChange={handleID} required defaultValue={boss.game_id}/>
            <br />
            <br />
            <label htmlFor="game_rank">
              Game_Rank:
            </label>
            <br />
            <input type="number" placeholder="Enter Game Rank" className="formInputs" onChange={handleGameRank} defaultValue={boss.game_rank}/>
            <br />
            <br />
            <label htmlFor="overall_rank">
              Overall_Rank:
            </label>
            <br />
            <input type="number" placeholder="Enter Overall Rank" className="formInputs" onChange={handleOverallRank} defaultValue={boss.overall_rank}/>
            <br />
            <br />
            <label htmlFor="lore">
              Lore:
            </label>
            <br />
            <input type="number" placeholder="Enter Lore" className="formInputs" onChange={handleLore} required defaultValue={boss.lore}/>
            <br />
            <br />
            <label htmlFor="appearence">
              Appearance:
            </label>
            <br />
            <input type="number" placeholder="Enter Appearance" className="formInputs" onChange={handleAppearance} required defaultValue={boss.appearence}/>
            <br />
            <br />
            <label htmlFor="difficulty">
              Difficulty:
            </label>
            <br />
            <input type="number" placeholder="Enter Difficulty" className="formInputs" onChange={handleDifficulty} required defaultValue={boss.difficulty}/>
            <br />
            <br />
            <label htmlFor="entertainment">
              Entertainment:
            </label>
            <br />
            <input type="number" placeholder="Enter Entertainment" className="formInputs" onChange={handleEntertainment} required defaultValue={boss.entertainment}/>
            <br />
            <br />
            <label htmlFor="level">
              Level:
            </label>
            <br />
            <input type="number" placeholder="Enter Level Score" className="formInputs" onChange={handleLevel} required defaultValue={boss.level}/>
            <br />
            <br />
            <label htmlFor="annoyance">
              Annoyance:
            </label>
            <br />
            <input type="number" placeholder="Enter Annoyance" className="formInputs" onChange={handleAnnoyance} required defaultValue={boss.annoyance}/>
            <br />
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      }
    </>
  )
}