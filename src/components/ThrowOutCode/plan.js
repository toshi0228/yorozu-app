import React from 'react';
import { Link } from 'react-router-dom';
import Heart from './heart';
import '../../styles/plan.scss';

const plan = () => {
  return (
    <div className="plan-card">
      <li>
        <div className="job-img">
          <img
            alt=""
            src="http://www.marugotoaomori.jp/wp-content/uploads/2017/02/d40922a1b3d07df201d2dcf4d5513db2.jpg"
          />
        </div>

        <div className="job-body">
          <div className="title">
            <Link to="/project/detail/id">
              せめて一日、みなとみらいをシリコンバレーにしたい
            </Link>
          </div>
          <div className="heart-icon">
            <Heart />
          </div>

          <div className="yado-name">宿名: 秘密の隠れ家の宿</div>
          <div className="supply">給与: 日当12000円〜</div>
          <div className="work-place">場所: 新潟県長岡市</div>
          <div className="work-term">期間: 土日</div>
          <div className="message">相談してみる</div>

          <div className="tag-list">
            <Link to="/" className="tag">
              #まかないあり
            </Link>
            <Link to="/" className="tag">
              #住み込みあり
            </Link>
            <Link to="/" className="tag">
              #インスタグラマー
            </Link>
            <Link to="/" className="tag">
              #学生大歓迎
            </Link>
          </div>
        </div>
      </li>
    </div>
  );
};

export default plan;
