import React, { useState, useEffect } from "react"; 
import style from './Participants.module.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import Input from '../Input/Input';
import Button from '../Button/Button';
import DateTimePicker from 'react-datetime-picker/dist/entry';

function Participants({
  info, 
  date,
  location,
  ammount,
  host, 
  hostName,
  hostEmail,
  participants,
  setDate, 
  setLocation, 
  setAmmount, 
  setHostName,
  setHostEmail,
  setParticipants,
  addParticipant,
  removeParticipant,
  setFormValidity,
  form,
  ...other
}) 
{
  const blankParticipant = {
    name:{
      value: '',
      validation: {
        required: true,
        minLength: 1
      },
      valid: true,
      formIsValid: false
    },
    email: {
      value: '',
      validation: {
        required: true,
        isEmail: true,
        minLength: 1
      },
      valid: true,
      formIsValid: false
    },
  };

  const index = 0;

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    const valCheck = checkValidity(value, info.location.validation);
    setLocation({...info.location, value: value, valid: valCheck, formIsValid: valCheck});
  };

  const handleAmmountChange = (event) => {
    const value = event.target.value;
    const valCheck = checkValidity(value, info.ammount.validation);
    setAmmount({...info.ammount, value: value, valid: valCheck, formIsValid: valCheck});  
  };

  const handleHostNameChange = (event) => {
    const val = event.target.value;
    const valCheck = checkValidity(val, host.hostName.validation);
    setHostName({...host.hostName, value: val, valid: valCheck, formIsValid: valCheck});    
  };
  
  const handleHostEmailChange = (event) => {
    const val = event.target.value;
    const valCheck = checkValidity(val, host.hostEmail.validation);
    setHostEmail({...host.hostEmail, value: val, valid: valCheck, formIsValid: valCheck});    
  };

  const handleParticipantNameChange = (event, index) => {
    const updatedParticipants = [...participants];
    const val = event.target.value;
    updatedParticipants[index].name.value = val;
    updatedParticipants[index].name.valid = checkValidity(updatedParticipants[index].name.value, updatedParticipants[index].name.validation)
    updatedParticipants[index].name.formIsValid = updatedParticipants[index].name.valid;
    setParticipants(updatedParticipants);
  };

  const handleParticipantEmailChange = (event, index) => {
    const updatedParticipants = [...participants];
    const val = event.target.value;
    updatedParticipants[index].email.value = val;
    updatedParticipants[index].email.valid = checkValidity(updatedParticipants[index].email.value, updatedParticipants[index].email.validation)
    updatedParticipants[index].email.formIsValid = updatedParticipants[index].email.valid;
    setParticipants(updatedParticipants);
  }

  const handleAddParticipant = () => {
    addParticipant(blankParticipant);
  };

  const handleRemoveParticipant = index => (event) => {
    event.preventDefault();
    removeParticipant(index);
  };  

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required){
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isEmail){
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }


  const formValidityChecker = () => {    
    if(
      !info.location.formIsValid ||
      !info.ammount.formIsValid ||
      !host.hostName.formIsValid ||
      !host.hostEmail.formIsValid 
    )
    {
      setFormValidity(false);
      return false;
    }
    
    for (const participant of participants){
      if (
        !participant.name.formIsValid ||
        !participant.email.formIsValid
      )
      {
        setFormValidity(false);
        return false;
      }
    }
    setFormValidity(true);
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValidityChecker()){
      return;
    }
    console.log(`The party will be held on: ${info.date}, on the location: ${info.location.value}, the max ammount of money is: ${info.ammount.value} RSD`);
    console.log(`The host is: ${host.hostName.value}`);
    
    const allParticipants = participants.concat(host);

    allParticipants.sort(() => 0.5 - Math.random());
    const pairs = [];
  
    if (allParticipants.length <2){
      setFormValidity(false);
      window.alert("Please enter more than one participant!");
    }else{
      while (allParticipants.length >=2) {
        const pair = [allParticipants.pop(), allParticipants.pop()];
        console.log('Pair: ', pair);
        pairs.push(pair);
      }
        console.log('All pairs', pairs)
    }
  }

  useEffect(() => console.log());

  const participantId = `name-${index}`;
  const emailId = `email-${index}`;

  return(
    <form onSubmit={event => handleSubmit(event)}>
      <div className={style.form_block}>
        <div className={style.info_form}>
          <h1 className={style.add_your_participants}>Add your participants</h1>
          <div className={style.party_info}>
            <div className={style.party_info_label}>
              <label className={style.party_info_label_date}>Date of your Secret Santa party</label>
              <label className={style.party_info_label_location}>Location of your Secret Santa party</label>
              <label className={style.party_info_label_ammount}>Amount to spend</label>
            </div>
            <div className={style.party_info_input}>
              <DateTimePicker 
                onChange={handleDateChange}
                className={style.dtp}
                value={info.date}
              />
              <Input 
                className={info.location.valid ? 'input' : 'input error'}
                name="location" 
                placeholder="Location..."
                onChange={event => handleLocationChange(event)}
              />
              <Input 
                className={info.ammount.valid ? 'input' : 'input error'}
                type="number"
                name="ammount" 
                placeholder="Ammount in RSD..."
                onChange={event => handleAmmountChange(event)}
              />
            </div>
            <hr className={style.party_info_line} />
          </div>
        </div>
      </div>   

      <div className={style.host}>
        <div className={style.host_label}>
          <label className={style.host_label_name}>Host</label>
          <label className={style.host_label_email}>Email</label>
        </div>
        <div className={style.host_input}>
          <p className={style.participant_number}>1</p>
          <div className={style.host_input_name}>  
            <Input 
              className={host.hostName.valid ? 'input' : 'input error'}
              name="name" 
              placeholder="Name..."
              onChange={event => handleHostNameChange(event)}
            />
          </div>
          <div className={style.host_input_email}>
            <Input
              className={host.hostEmail.valid ? 'input' : 'input error'}
              placeholder="Email..."
              name="email"
              onChange={event => handleHostEmailChange(event)}
            />
          </div>
          <div className={style.host_info_warning}>
            <label>This person is a participant too.</label>
          </div>
        </div>
      </div>
      
      {/* value is participants */}
      <div className={style.participant}>                
        {
          participants.map((value, index) => (
            <div className={style.participant_block} key={`participant-${index}`}>
              <div className={style.participant_label}>  
                <label className={style.participant_label_name} htmlFor={participantId}>Participant</label>
                <label className={style.participant_label_email} htmlFor={emailId}>Email</label>
              </div>
              <div className={style.participant_input}>  
                <p className={style.participant_number}>{index+2}</p>
                <div className={style.participant_input_name}>  
                  <Input
                    className={value.name.valid ? 'input' : 'input error'}
                    placeholder="Name..."
                    name={participantId}
                    data-index={index}
                    id={participantId}
                    title="name"
                    value={value.name.value}                 
                    onChange={event => handleParticipantNameChange(event, index)}
                  />
                </div>
                <div className={style.participant_input_email}>
                  <Input
                    className={value.email.valid ? 'input' : 'input error'}
                    placeholder="Email..."
                    name={emailId}
                    data-index={index}
                    id={emailId}
                    title="email"
                    value={value.email.value}
                    onChange={event => handleParticipantEmailChange(event, index)}
                  />
                </div>
                <div className={style.participant_button_remove}>
                  <Button 
                    remove
                    onClick={handleRemoveParticipant(index)}
                  >
                    - REMOVE
                  </Button>
                </div>
              </div>
            </div>
          ))
        }
      
        <div className={style.btn_add}>
          <Button 
            type="button"
            onClick={() => {handleAddParticipant(); setFormValidity(false)}}
          >
          + ADD PERSON
          </Button>
        </div>
      </div>

      <hr className={style.participants_line} />

      <div className={style.btn_submit}>
        <Button type='submit' submit >SUBMIT</Button>
      </div>
    </form>
  );      
}

const mapStateToProps = state => {
  return {
    info: state.info,
    host: state.host,
    participants: state.participants.participants,
    form: state.form
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setDate: (date) => dispatch({type: actionTypes.DATE, date: date }),
    setLocation: (location) => dispatch({type: actionTypes.LOCATION, location: location}),
    setAmmount: (ammount) => dispatch({type: actionTypes.AMMOUNT, ammount: ammount}),
    setHostName: (hostName) => dispatch({type: actionTypes.HOST_NAME, hostName: hostName}),
    setHostEmail: (hostEmail) => dispatch({type: actionTypes.HOST_EMAIL, hostEmail: hostEmail}),
    setParticipants: (particips) => dispatch({type: actionTypes.SET_PARTICIPANTS, particips: particips}),
    addParticipant: (blankParticipant) => dispatch({type: actionTypes.ADD_PARTICIPANT, blankParticipant: blankParticipant}),
    removeParticipant: (id) => dispatch({type: actionTypes.REMOVE_PARTICIPANT, index: id}),
    setFormValidity: (v) => dispatch({type: actionTypes.CHECK_FORM, v: v}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
