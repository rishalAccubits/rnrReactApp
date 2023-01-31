import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { leaderBoard } from '../../helpers/api';


const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    leaderBoard().then((val) => {
        console.log({val})
        setLeaderboard(val.data.users)
    })
},[]);


  return (
    <div>
      {leaderboard && leaderboard.map((item) => (
        <div>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                {item.name}
                <span class="badge bg-primary rounded-pill">{item.coinBalance}</span>
            </li>
        </ul>
        </div>
        ))}

    </div>


  );
};


export default Leaderboard;
