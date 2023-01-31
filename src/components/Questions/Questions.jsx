import React, { useEffect, useState } from 'react'
import { getTimer, claimToken } from '../../helpers/web3'
import { getUnlockedQuestions } from '../../helpers/api'


const Question = (props) => {
  const [unlockedQn, setunlockedQn] = useState([]);


  const handleClick = (item) => {
    console.log("unlocked Qn", item);
  }

  useEffect(() => {
    getUnlockedQuestions.then((item) => {
        console.log("unlocked Qn",item)
        setunlockedQn(item.data)
    })
    .catch((error) => {
        console.log("Error",item)
    })
  },[]);

  return (
    <div>
    <form>
        <div class="alert alert-dismissible alert-secondary">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Q. </strong> {unlockedQn.question}
        </div>
        <fieldset class="form-group">
            <legend class="mt-4">Options</legend>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked=""/>
            <label class="form-check-label" for="optionsRadios1">
                {unlockedQn.option_1}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
            <label class="form-check-label" for="optionsRadios2">
                {unlockedQn.option_2}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled=""/>
            <label class="form-check-label" for="optionsRadios3">
                {unlockedQn.option_3}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios3" value="option4" disabled=""/>
            <label class="form-check-label" for="optionsRadios3">
                {unlockedQn.option_4}
            </label>
            </div>
            <div>
                <button type="button" class="btn btn-info" onClick={() => handleClick(item)}>Info</button>          
            </div>
        </fieldset>
    </form>

    </div>
  )
}

export default Question