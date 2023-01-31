import React, { useEffect, useState } from 'react'
import { getQuestions ,getUnlockedQuestions, submitAnswer  } from '../../helpers/api';
import { unlockQuestion  } from '../../helpers/web3';
import {convertFromWeiToEther} from '../../helpers/utils'
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

const Play = (props) => {
    const [questionSet, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [unlockedQn, setunlockedQn] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getQuestions(props.account).then((val) => {
            console.log({val})
            setQuestions(val.data)
        })
    },[props]);

    useEffect(() => {
      if(selectedItem) {
        openSweetAlert();
      }
    },[selectedItem]);

    useEffect(() => {
      if(unlockedQn) {
        attendQuestion(unlockedQn);
      }
    },[unlockedQn]);

    const balance = convertFromWeiToEther(props.balance)
    const handleItemClick = (item) => {
      console.log("hey i am called here", item);
      console.log("Question Id ###",item.question.questionId)
      setSelectedItem(item.question.questionId);
    };

  
    const openSweetAlert = () => {
      console.log("Selected Qn ID", selectedItem)
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
  


    function attendQuestion(item) {
      swal.fire({
        title: 'Choose an option',
        text: `${item.data.question}`,
        input: 'radio',
        inputOptions: {
          "1": `${item.data.option_1}`,
          "2": `${item.data.option_2}`,
          "3": `${item.data.option_3}`,
          "4": `${item.data.option_3}`,
        },
        inputValidator: function (value) {
          console.log("Selected Value", value)
          if (!value) {
            return 'You need to choose an option!'
          }
        }
      }).then((result) => {
        console.log("Result Value", result)
        if (result.value) {
          const selectedOption = unlockedQn.data['option_' + Number(result.value)];
          submitAnswer(item.data.questionId, props.account, selectedOption).then((data) => {
            console.log("Submitted Answer Response", data)
            if(data.status === "error") {
              console.log("data status is", data.status)
              // swal("Wrong Answer", `${data.message}` , "error");
            
            }
          }).catch((err) => {
            console.log("Error is", err)
          })
        }
      });
    }

    const handleSubmit = async (value) => {
      console.log(`Value entered: ${value}`);
      await unlockQuestion(value, selectedItem).then((isunlocked) => {
        console.log("Is question unloacked", isunlocked)
      }).catch((err) => {
        console.log("error is", err)
      })
    };
  


    const handlePlay = async (value) => {
      console.log("Selected Item", value)
      await getUnlockedQuestions(props.account, value.question.questionId).then((item) => {
        console.log("Questions are", item)
        setunlockedQn(item)
      })
    }

  return (
    <div>
        <div>
          <span class="badge bg-info">Available Balance: {props.balance}</span>
        </div>
        <Row>
          {questionSet && questionSet.map((item, index) => (
            <Col md={6} key={index}>
                <div class="card bg-dark mb-3" style={{ maxWidth: "20rem" }}>
                <div class="card-header">Difficulty: {item.question.difficulty}</div>
                <div class="card-body">
                  {item.questionUnlocked && 
                      <span class="badge bg-success">Unlocked</span>
                  }
                  {!item.questionUnlocked && 
                      <span class="badge bg-danger">Locked</span>
                  }
                  {item.answerSubmitted && 
                      <span class="badge bg-success">Attended</span>
                  }
                  <span class="badge bg-warning">{item.question.rewardMultiplier}X</span>
                  <h4 class="card-title">Topic: {item.question.topic}</h4>
                  {(item.questionUnlocked && !item.answerSubmitted )&&
                    <div id={item.question._id}>
                      <button type="button" class="btn btn-secondary" onClick={() => handlePlay(item)}>
                        Play
                      </button>  
                    </div>
                  }
                  {item.answerSubmitted &&
                    <div id={item.question._id}>
                      <button type="button" class="btn btn-secondary">
                        Answered
                      </button>  
                    </div>
                  }
                  {!item.questionUnlocked &&
                    <div id={item.question._id}>
                      <button type="button" class="btn btn-secondary" onClick={() => handleItemClick(item)}>
                        Unlock
                      </button>  
                    </div>
                  }
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {questionSet.length < 1 && (
          <div>
            <div class="alert alert-dismissible alert-danger">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>Oh snap!</strong>{" "}
              <a class="alert-link">
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