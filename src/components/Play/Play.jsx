import React, { useEffect, useState } from 'react'
import { getQuestions  } from '../../helpers/api';
import { unlockQuestion  } from '../../helpers/web3';
import swal from 'sweetalert2';


const Play = (props) => {
    const [questionSet, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("")
    useEffect(() => {
        getQuestions(props.account).then((val) => {
            console.log({val})
            setQuestions(val.data)
        })
    },[]);

    const handleItemClick = (item) => {
      console.log("hey i am called here", item);
      setSelectedItem(item.question.questionId);
      openSweetAlert();
    };
  
    const openSweetAlert = () => {
      swal.fire({
        title: "Enter Accucoin Amount",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        preConfirm: async (value) => {
          if (!value) {
            swal.showValidationMessage("Amount is required");
          } else if (value < 10) {
            swal.showValidationMessage("Amount must be greater than 10");
          } else if (!Number.isInteger(Number(value))) {
            swal.showValidationMessage("Amount must be a whole number");
          } else {
            return value;
          }
        },
        allowOutsideClick: () => !swal.isLoading(),
      }).then((result) => {
        if (result.value) {
          handleSubmit(result.value);
        }
      });
    };
  
    const handleSubmit = async (value) => {
      console.log(`Value entered: ${value}`);
      await unlockQuestion(value, selectedItem).then((isunlocked) => {
        console.log("Is question unloacked", isunlocked)
      }).catch((err) => {
        console.log("error is", err)
      })
    };
  


    const handlePlay = async (value) => {
      console.log("Selected Item is", selectedItem)
      console.log(value)
      // await unlockQuestion(selectedItem, value)
    }

  return (
    <div>
        {questionSet && questionSet.map((item) => (
          <div className="card bg-dark mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">Difficulty: {item.question.difficulty}</div>
            <div className="card-body">
              {item.questionUnlocked && 
                  <span className="badge bg-success">Unlocked</span>
              }
              {!item.questionUnlocked && 
                  <span className="badge bg-danger">Locked</span>
              }
              {item.answerSubmitted && 
                  <span className="badge bg-success">Attended</span>
              }
              <span className="badge bg-warning">{item.question.rewardMultiplier}X</span>
              <h4 className="card-title">Topic: {item.question.topic}</h4>
              {(item.questionUnlocked && !item.answerSubmitted )&&
                <div id={item.question._id}>
                  <button type="button" className="btn btn-secondary" onClick={() => handlePlay(item)}>
                    Play
                  </button>  
                </div>
              }
              {item.answerSubmitted &&
                <div id={item.question._id}>
                  <button type="button" className="btn btn-secondary">
                    Answered
                  </button>  
                </div>
              }
              {!item.questionUnlocked &&
                <div id={item.question._id}>
                  <button type="button" className="btn btn-secondary" onClick={() => handleItemClick(item)}>
                    Unlock
                  </button>  
                </div>
              }
            </div>
          </div>
        ))}
        {modalOpen &&
        <div className="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Enter Accucoin Amount</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
            <div className="form-group">
              <label className="form-label mt-4">Available balance: </label>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="0 Accucoin" aria-label="accucoin" aria-describedby="button-addon2"/>
                  <button className="btn btn-primary" type="button" id="button-addon2" onSubmit={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        }   
        {questionSet.length < 1 && (
          <div>
            <div className="alert alert-dismissible alert-danger">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>Oh snap!</strong>{" "}
              <a className="alert-link">
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