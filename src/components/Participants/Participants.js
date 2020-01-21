import React, { useState, useEffect } from "react"; 
import style from './Participants.module.css';

import Input from '../Input/Input';
import Button from '../Button/Button';
import DateTimePicker from 'react-datetime-picker/dist/entry';
import { NotificationContainer, notifyError } from '../Notifications/Notifications';

function Participants() {
  const [info, setInfo] = useState({
    date: new Date(), 
    location: '', 
    ammount: ''
  });

  const [host, setHost] = useState({
    hostName: '',
    email: ''
  });
  
  const blankParticipant = { name: '', email: '' };
  const [participants, setParticipants] = useState([
    {...blankParticipant },
  ]);

  const index = 0;

  const handleSubmitButtonSwitch = () => {
    if (
      info.date > 0 &&
      info.location.length > 0 && 
      info.ammount.length > 0 && 
      host.hostName.length > 0 && 
      host.email.length > 0 
    ){
      return <Button submit onClick={handleSubmit}>SUBMIT</Button>
    }
    else{
      return (
        <div>
          <Button disabled onClick={() => notifyError("Fields can not be left empty", "Error")}>SUBMIT</Button>
          <NotificationContainer />
        </div>
      )
    } 
  }

  const handleInfoChange = (event) => 
    setInfo({...info, [event.target.name]: event.target.value,});

  const handleDateChange = (date) =>
    setInfo({...info, date: date});

  const handleHostChange = (event) => 
    setHost({...host, [event.target.name]: event.target.value,});

  const handleParticipantChange = (event) => {
    const updatedParticipants = [...participants];
    updatedParticipants[event.target.dataset.index][event.target.title] = event.target.value; 
    setParticipants(updatedParticipants);
  };

  const handleAddParticipant = () => {
    setParticipants([...participants, { ...blankParticipant }]);
  };

  const handleRemoveParticipant = index => (event) => {
    event.preventDefault();
    setParticipants(participants.filter((p, pindex) => index !== pindex));
  };  

  const handleSubmit = () => {
    console.log(`The party will be held on: ${info.date}, on the location: ${info.location}, the max ammount of money is: ${info.ammount} RSD`);
    console.log(`The host is: ${host.hostName}`);
    
    const allParticipants = participants.concat(host);

    allParticipants.sort(() => 0.5 - Math.random());
    const pairs = [];
  
    while (allParticipants.length >=2) {
      const pair = [allParticipants.pop(), allParticipants.pop()];
      console.log('Pair: ', pair);
      pairs.push(pair);
    }
  
    console.log('All pairs', pairs)
  }

  const participantId = `name-${index}`;
  const emailId = `email-${index}`;

  useEffect(() => console.log(info.date));

  return(
    <div>
      <div className={style.form_block}>
        <form className={style.info_form}>
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
                onChange={handleInfoChange} 
                name="location" 
                placeholder="Location..."
              />
              <Input 
                onChange={handleInfoChange} 
                type="number"
                name="ammount" 
                placeholder="Ammount in RSD..."
              />
            </div>
            <hr className={style.party_info_line} />
          </div>
        </form>
      </div>   

      <form className={style.host}>
        <div className={style.host_label}>
          <label className={style.host_label_name}>Host</label>
          <label className={style.host_label_email}>Email</label>
        </div>
        <div className={style.host_input}>
          <p className={style.participant_number}>1</p>
          <div className={style.host_input_name}>  
            <Input
              placeholder="Name..."
              name="hostName"
              id="hostName"
              value={host.hostName}
              onChange={handleHostChange}
            />
          </div>
          <div className={style.host_input_email}>
            <Input
              placeholder="Email..."
              name="email"
              id="email"
              value={host.email}
              onChange={handleHostChange}
            />
          </div>
          <div className={style.host_info_warning}>
            <label>This person is a participant too.</label>
          </div>
        </div>
      </form>
      
      <form className={style.participant}>                
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
                      placeholder="Name..."
                      name={participantId}
                      data-index={index}
                      id={participantId}
                      title="name"
                      value={value.name}                 
                      onChange={handleParticipantChange}
                  />
                </div>
                <div className={style.participant_input_email}>
                  <Input
                      placeholder="Email..."
                      name={emailId}
                      data-index={index}
                      id={emailId}
                      title="email"
                      value={value.email}
                      onChange={handleParticipantChange}
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
            add
            type="button"
            onClick={handleAddParticipant}
          >
          + ADD PERSON
          </Button>
        </div>
      </form>

      <hr className={style.participants_line} />

      <div className={style.btn_submit}>
        {handleSubmitButtonSwitch()}
      </div>
    </div>
  );      
}

export default Participants;
