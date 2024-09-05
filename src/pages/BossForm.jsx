import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function BossForm({token}) {
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

  const setNewBoss = async() => {
    try {
      const response = await fetch('https://soulsserver-production.up.railway.app/api/bosses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
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
    setNewBoss();
  }


  return(
    <>
      {!token 
        ?
        <></>
        :
        <div className="bossFormDiv">
          <form className="form" onSubmit={handleSubmit}>
            <h2>New Boss</h2>
            <p>*Note: This form creates a new boss and will calculate ladela</p>
            <label htmlFor="name">
              Name:
            </label>
            <br />
            <input type="text" placeholder="Enter Name" className="formInputs" onChange={handleName}/>
            <br />
            <br />
            <label htmlFor="desc">
              Description:
            </label>
            <br />
            <textarea type="textarea" placeholder="Enter Descritpion" className="formInputs" onChange={handleDescription}/>
            <br />
            <br />
            <label htmlFor="image">
              Image:
            </label>
            <br />
            <input type="text" placeholder="Enter Image URL" className="formInputs" onChange={handleImage}/>
            <br />
            <br />
            <label htmlFor="game_id">
              Game_ID:
            </label>
            <br />
            <input type="number" placeholder="Enter Game_ID" className="formInputs" onChange={handleID}/>
            <br />
            <br />
            <label htmlFor="game_rank">
              Game_Rank:
            </label>
            <br />
            <input type="number" placeholder="Enter Game Rank" className="formInputs" onChange={handleGameRank}/>
            <br />
            <br />
            <label htmlFor="overall_rank">
              Overall_Rank:
            </label>
            <br />
            <input type="number" placeholder="Enter Overall Rank" className="formInputs" onChange={handleOverallRank}/>
            <br />
            <br />
            <label htmlFor="lore">
              Lore:
            </label>
            <br />
            <input type="number" placeholder="Enter Lore" className="formInputs" onChange={handleLore}/>
            <br />
            <br />
            <label htmlFor="appearence">
              Appearence:
            </label>
            <br />
            <input type="number" placeholder="Enter Appearance" className="formInputs" onChange={handleAppearance}/>
            <br />
            <br />
            <label htmlFor="difficulty">
              Difficulty:
            </label>
            <br />
            <input type="number" placeholder="Enter Difficulty" className="formInputs" onChange={handleDifficulty}/>
            <br />
            <br />
            <label htmlFor="entertainment">
              Entertainment:
            </label>
            <br />
            <input type="number" placeholder="Enter Entertainment" className="formInputs" onChange={handleEntertainment}/>
            <br />
            <br />
            <label htmlFor="level">
              Level:
            </label>
            <br />
            <input type="number" placeholder="Enter Level Score" className="formInputs" onChange={handleLevel}/>
            <br />
            <br />
            <label htmlFor="annoyance">
              Annoyance:
            </label>
            <br />
            <input type="number" placeholder="Enter Annoyance" className="formInputs" onChange={handleAnnoyance}/>
            <br />
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      }
    </>
  )
}