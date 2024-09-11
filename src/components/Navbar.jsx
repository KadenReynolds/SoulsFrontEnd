import { useState, useEffect } from "react"
import menu from '../assets/menu.svg'
import menuflipped from '../assets/menuflipped.svg'
import SSIcon from '../assets/SSIcon.svg'
import SSIcon2 from '../assets/SSIcon2.svg'
import { useLocation } from "react-router-dom"

export default function Navbar({token}){
  const [classHome, setClassHome] = useState("navLinks")
  const [classGames, setClassGames] = useState("navLinks")
  const [classLogin, setClassLogin] = useState("navLinks")
  const [classBossForm, setClassBossForm] = useState("navLinks")
  const location = useLocation().pathname

  useEffect(() => {
    getPath()
  },[])
  
  function getPath() {
    console.log(location)
    if(location === "/"){
      setClassHome("active")
      console.log(classHome)
    } else if(location === "/catalog_games"){
      setClassGames("active")
      console.log(classGames)
    } else if(location === "/login"){
      setClassLogin("active")
    } else {
      setClassBossForm("active")
    }
  }

  return(
    <>
      <img src={SSIcon2} alt="" className="navIcon"/>
      <div className="navBarDiv">
          <ul className="dropdown">
            <h4 className="dropdownMenu">Menu</h4>
            <li className="navLi"><a href="/" className={classHome}>Home</a></li>
            <li className="navLi"><a href="/catalog_games" className={classGames}>Games</a></li>
            {!token
              ?
              <li className="navLi"><a href="/login" className={classLogin}>Login</a></li>
              :
              <li className="navLi"><a href="/bosses/newboss" className={classBossForm}>Add Boss</a></li>
            }
          </ul>
      </div>
    </>
  )
}