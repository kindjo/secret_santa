import React, { useEffect } from "react"; 
import style from './Participants.module.css';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import { reduxForm } from 'redux-form';
import validate from '../../validate';

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
    name: '',
    email: ''
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAmmountChange = (event) => {
    setAmmount(event.target.value);  
  };

  const handleHostNameChange = (event) => {
    setHostName(event.target.value);    
  };
  
  const handleHostEmailChange = (event) => {
    setHostEmail(event.target.value);    
  };

  const handleParticipantNameChange = (event, index) => {
    const updatedParticipants = [...participants];
    const val = event.target.value;
    updatedParticipants[index].name = val;
    setParticipants(updatedParticipants);
  };

  const handleParticipantEmailChange = (event, index) => {
    const updatedParticipants = [...participants];
    const val = event.target.value;
    updatedParticipants[index].email = val;
    setParticipants(updatedParticipants);
  }

  const handleAddParticipant = () => {
    addParticipant(blankParticipant);
  };

  const handleRemoveParticipant = index => (event) => {
    event.preventDefault();
    removeParticipant(index);
  };  

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

  // const xxxxx = `name-${index}`;
  // const yyyyyy = `email-${index}`;

  return(
    <form onSubmit={handleSubmit}>
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
                className={style.input}
                name="location" 
                placeholder="Location..."
                onChange={event => handleLocationChange(event)}
              />
              <Input 
                className={style.input}
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
              className={style.input}
              name="hostName" 
              placeholder="Name..."
              onChange={event => handleHostNameChange(event)}
            />
          </div>
          <div className={style.host_input_email}>
            <Input
              className={style.input}
              placeholder="Email..."
              name="hostEmail"
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
                <label className={style.participant_label_name} htmlFor={`name-${index}`}>Participant</label>
                <label className={style.participant_label_email} htmlFor={`email-${index}`}>Email</label>
              </div>
              <div className={style.participant_input}>  
                <p className={style.participant_number}>{index+2}</p>
                <div className={style.participant_input_name}>  
                  <Input
                    className={style.input}
                    placeholder="Name..."
                    name={`name[${index}]`}
                    data-index={index}
                    id={`name-${index}`}
                    title="name"
                    value={value.name.value}                 
                    onChange={event => handleParticipantNameChange(event, index)}
                  />
                </div>
                <div className={style.participant_input_email}>
                  <Input
                    className={style.input}
                    placeholder="Email..."
                    name={`email[${index}]`}
                    data-index={index}
                    id={`email-${index}`}
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
    formValidity: state.formIsValid
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
    setFormValidity: (v) => dispatch({type: actionTypes.CHECK_FORM_VALIDITY, v: v}),
  }
};

const connectedParticipants = connect(
  mapStateToProps,
  mapDispatchToProps
)(Participants);

export default reduxForm({
  form: 'participants-form',
  validate
})(connectedParticipants);
