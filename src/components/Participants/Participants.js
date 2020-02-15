import React, { useState, useEffect } from "react"; 
import style from './Participants.module.css';

import Input from '../Input/Input';
import Button from '../Button/Button';
import DateTimePicker from 'react-datetime-picker/dist/entry';

function Participants() {
  const [info, setInfo] = useState({
    location:{
      value: '',
      validation: {
        required: true,
        minLength: 1
      },
      valid: true,
      formIsValid: false
    },
    ammount: {
      value: '',
      validation: {
        required: true,
        isNumeric: true,
        minLength: 1
      },
      valid: true,
      formIsValid: false 
    },
  });

  const [host, setHost] = useState({
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
  });
  
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

  const [participants, setParticipants] = useState([{
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
  },
  ]);

  const index = 0;

  const [formIsValid, setFormIsValid] = useState(false)

  const handleDateChange = (date) =>
    setInfo({...info, date: date});

  const handleAddParticipant = () => {
    setParticipants([...participants, {...blankParticipant}]);
  };

  const handleRemoveParticipant = index => (event) => {
    event.preventDefault();
    setParticipants(participants.filter((p, pindex) => index !== pindex));
  };  

  const handleParticipantNameChange = (event, index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name.value = event.target.value;
    updatedParticipants[index].name.valid = checkValidity(updatedParticipants[index].name.value, updatedParticipants[index].name.validation)
    updatedParticipants[index].name.formIsValid = updatedParticipants[index].name.valid;
    setParticipants(updatedParticipants);
  };

  const handleParticipantEmailChange = (event, index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].email.value = event.target.value;
    updatedParticipants[index].email.valid = checkValidity(updatedParticipants[index].email.value, updatedParticipants[index].email.validation);
    updatedParticipants[index].email.formIsValid = updatedParticipants[index].email.valid;
    setParticipants(updatedParticipants);
  }
   
  const checkOnChange = (event, identifier) => {
    const selector = {...identifier};

    selector.value = event.target.value;
    selector.valid = checkValidity(selector.value, selector.validation);
    selector.formIsValid = selector.valid;

    if (event.target.name === 'location' || event.target.name === "ammount" )
    setInfo({...info, [event.target.name]: selector})
    
    if (event.target.name === 'name' || event.target.name === "email" )
    setHost({...host, [event.target.name]: selector})
  }

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
    const index = participants.length -1;
    let i = 0;
    while(i<=index){
      if(
        info.location.formIsValid &&
        info.ammount.formIsValid &&
        host.name.formIsValid &&
        host.email.formIsValid &&
        participants[i].name.formIsValid && 
        participants[i].email.formIsValid
        ){
        setFormIsValid(true);
      }else{
        setFormIsValid(false);
      }
    i++;
    }
  }

  useEffect(() => formValidityChecker);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`The party will be held on: ${info.date}, on the location: ${info.location.value}, the max ammount of money is: ${info.ammount.value} RSD`);
    console.log(`The host is: ${host.name.value}`);
    
    const allParticipants = participants.concat(host);

    allParticipants.sort(() => 0.5 - Math.random());
    const pairs = [];
  
    if (allParticipants.length <2){
      setFormIsValid(false);
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

  const participantId = `name-${index}`;
  const emailId = `email-${index}`;

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
                className={info.location.valid ? 'input' : 'input error'}
                name="location" 
                placeholder="Location..."
                onChange={event => checkOnChange(event, info.location)}
              />
              <Input 
                className={info.ammount.valid ? 'input' : 'input error'}
                type="number"
                name="ammount" 
                placeholder="Ammount in RSD..."
                onChange={event => checkOnChange(event, info.ammount)}
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
              className={host.name.valid ? 'input' : 'input error'}
              name="name" 
              placeholder="Name..."
              onChange={event => checkOnChange(event, host.name)}
            />
          </div>
          <div className={style.host_input_email}>
            <Input
              className={host.email.valid ? 'input' : 'input error'}
              placeholder="Email..."
              name="email"
              onChange={event => checkOnChange(event, host.email)}
            />
          </div>
          <div className={style.host_info_warning}>
            <label>This person is a participant too.</label>
          </div>
        </div>
      </div>
      
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
            onClick={() => {handleAddParticipant(); setFormIsValid(false)}}
          >
          + ADD PERSON
          </Button>
        </div>
      </div>

      <hr className={style.participants_line} />

      <div className={style.btn_submit}>
        <Button type='submit' submit disabled={!formIsValid}>SUBMIT</Button>
      </div>
    </form>
  );      
}

export default Participants;
