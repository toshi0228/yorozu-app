import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MessagePage = ({ id }) => {
  return (
    <div>
      <Header />
      <div>メッセージページ</div>
      <ul>
        <Link to="/message/rooms/1111">
          <li>万屋1</li>
        </Link>
        <Link to="/message/rooms/1111">
          <li>万屋2</li>
        </Link>
        <Link to="/message/rooms/1111">
          <li>万屋3</li>
        </Link>
      </ul>
      <Footer />
    </div>
  );
};

export default MessagePage;
