import React, { useEffect, useState } from 'react'
import { getQuestions } from '../../heplers/api';

 

const Play = (props) => {
    const [questionSet, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions(props.account).then((val) => {
            console.log({val})
            setQuestions(val.data)
        })
    },[]);

    const handleItemClick = (item) => {
        console.log("hey i am called here", item);
        // setSelectedItem(item);
        // setModalOpen(true);
      };

  return (
    <div>
        {questionSet.map((item) => (
          <div class="card bg-dark mb-3" style={{ maxWidth: "20rem" }}>
            <div class="card-header">Header</div>
            <div class="card-body">
              <h4 class="card-title">Light card title</h4>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => handleItemClick(item)}
              >
                Play
              </button>
            </div>
          </div>
        ))}
        {questionSet.length < 1 && (
          <div>
            <div class="alert alert-dismissible alert-danger">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>Oh snap!</strong>{" "}
              <a href="#" class="alert-link">
                No Game Modes are available
              </a>{" "}
              try again.
            </div>
          </div>
        )}
      </div>
  )
}

export default Play