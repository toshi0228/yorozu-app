import React from 'react';
import { Link } from 'react-router-dom';

const MessagePage = ({ id }) => {
  return (
    <div>
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
    </div>
  );
};

export default MessagePage;
