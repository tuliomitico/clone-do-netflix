import React from 'react'

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <div className="logo"></div>
        </li>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
