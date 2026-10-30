import "./Header.css"

const Header = () => {
  return(
    <div className="header-container">
      <img src="/Logo/Logo.png" alt="Logo" className="header-logo"/>
      
      <div className="menu-container">
        <span>menu</span>

        <i className="fa-solid fa-bars"/>
      </div>
    </div>
  )
}

export default Header;