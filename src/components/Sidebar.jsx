import React,{useState} from "react";

function Sidebar({ darkMode, setDarkMode }) {
  const [active, setActive] = useState("contacts");
  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="ti ti-messages" />
      </div>

      <nav className="nav">
        <button
          className={`nav-btn ${active === "contacts" ? "active" : ""}`}
          onClick={() => setActive("contacts")}
          aria-label="Contacts"
        >
          <i className="ti ti-address-book" />
          <span className="tooltip">Contacts</span>
        </button>

        <button
          className={`nav-btn ${active === "invite" ? "active" : ""}`}
          onClick={() => setActive("invite")}
          aria-label="Send invite"
        >
          <i className="ti ti-user-plus" />
          <span className="tooltip">Send invite</span>
        </button>
      </nav>

      <div className="spacer" />

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        <i className={`ti ${darkMode ? "ti-sun" : "ti-moon"}`} />
      </button>
    </aside>
  );
}

export default Sidebar;
