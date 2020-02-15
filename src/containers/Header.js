import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';

const Header = () => {
  return (
    <div>
      <header>
        <div className="inner">
          <div className="logo">
            <h1>
              <Link to="/">Yorozu</Link>
            </h1>
          </div>

          <ul className="menu">
            <li>
              <Link to="/work">Home</Link>
            </li>
            <li>
              <Link to="/project">About</Link>
            </li>
            <li>
              <Link to="/time_line">Topic</Link>
            </li>
            <li>
              <Link to="/create_plan">Create</Link>
            </li>
          </ul>

          <div className="rogin-btn">
            <Link to="/sign_in">
              <div>ログイン </div>
            </Link>

            <Link to="/sign_up">
              <div>新規登録 </div>
            </Link>
          </div>
        </div>
        {/* inner */}
      </header>
      <hr className="header-borde-line" />
    </div>
  );
};

export default Header;
