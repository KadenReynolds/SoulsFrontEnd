import { useState } from "react"

export default function Navbar({token}){
  const [buttonClass, setButtonClass] = useState('dropdownPre')
  const [clickNum, setClickNum] = useState(0)

  return(
    <>
      <div className="navBarDiv">
          <h4 className="navMenu" children="dropdown" onClick={() => {
            if (clickNum === 0){
              setButtonClass('dropdown')
              setClickNum(1)
            } else {
              setButtonClass('dropdownPre')
              setClickNum(0)
            }
          }}>Menu</h4>
          <ul className={buttonClass}>
            <li className="navLi"><a href="/" className="navLinks">Home</a></li>
            <li className="navLi"><a href="/catalog_games" className="navLinks">Games</a></li>
            {!token
              ?
              <li className="navLi"><a href="/login" className="navLinks">Login</a></li>
              :
              <li className="navLi"><a href="/bosses/newboss" className="navLinks">Add Boss</a></li>
            }
          </ul>
      </div>
    </>
  )
}