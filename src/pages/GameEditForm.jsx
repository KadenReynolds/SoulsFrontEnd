import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function GameEditForm({token}) {
  const [game, setGame] = useState({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [build, setBuild] = useState("")
  const [image, setImage] = useState("")

  const navigate = useNavigate();
  const {gameID} = useParams();

  useEffect (() => {
    getGameByID();
  }, [])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleBuild = (e) => {
    setBuild(e.target.value)
  }

  const handleImage = (e) => {
    setImage(e.target.value)
  }

  const getGameByID = async() => {
    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/games/${gameID}`)
      const result = await response.json()

      console.log(result.game[0])

      setGame(result.game[0])
      setName(result.game[0].name)
      setDescription(result.game[0].description)
      setBuild(result.game[0].build_played)
      setImage(result.game[0].game_image)
    }
    catch(err){
      console.error(err.message)
    }
  }

  const setEditBoss = async() => {
    try {
      const response = await fetch(`https://soulsserver-production.up.railway.app/api/games/${gameID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          build_played: build,
          game_image: image,
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
            <h2>Edit Game</h2>
            <p>*Note: This form edits a existing game</p>
            <label htmlFor="name">
              Name:
            </label>
            <br />
            <input type="text" placeholder="Enter Name" className="formInputs" onChange={handleName} defaultValue={game.name}/>
            <br />
            <br />
            <label htmlFor="desc">
              Description:
            </label>
            <br />
            <textarea type="textarea" placeholder="Enter Descritpion" className="formInputs" onChange={handleDescription} defaultValue={game.description}/>
            <br />
            <br />
            <label htmlFor="build">
              Build:
            </label>
            <br />
            <input type="text" placeholder="Enter Build" className="formInputs" onChange={handleBuild} required defaultValue={game.build_played}/>
            <br />
            <br />
            <label htmlFor="image">
              Image:
            </label>
            <br />
            <input type="text" placeholder="Enter Image URL" className="formInputs" onChange={handleImage} required defaultValue={game.game_image}/>
            <br />
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      }
    </>
  )
}