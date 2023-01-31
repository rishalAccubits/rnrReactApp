import React, { useEffect, useState } from 'react'
import { getTimer, claimToken } from '../../helpers/web3'

const Question = (props) => {


  useEffect(() => {
    getTimerValue()
  },[]);

  return (
    <div>
    <form>
        <div class="alert alert-dismissible alert-secondary">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Q. </strong> Question
        </div>
        <fieldset class="form-group">
            <legend class="mt-4">Options</legend>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked=""/>
            <label class="form-check-label" for="optionsRadios1">
                Option one is this and that—be sure to include why it's great
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
            <label class="form-check-label" for="optionsRadios2">
                Option two can be something else and selecting it will deselect option one
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled=""/>
            <label class="form-check-label" for="optionsRadios3">
                Option three is disabled
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios3" value="option4" disabled=""/>
            <label class="form-check-label" for="optionsRadios3">
                Option four is disabled
            </label>
            </div>            
        </fieldset>
    </form>

    </div>
  )
}

export default Question