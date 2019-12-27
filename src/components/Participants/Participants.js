import React, { useState, useEffect } from "react"; 
import style from './Participants.module.css';

import Input from '../Input/Input';
import Button from '../Button/Button';

function Participants(index) {
  const [host, setHost] = useState({
    hostName: '',
    email: ''
  });
  
  const blankParticipant = { name: '', email: '' };
  const [participants, setParticipants] = useState([
    { ...blankParticipant },
  ]);

  const handleHostChange = (event) => 
    setHost({...host, [event.target.name]: event.target.value,});

  const handleParticipantChange = (event) => {
    const updatedParticipants = [...participants];
    updatedParticipants[event.target.dataset.index][event.target.cname] = event.target.value; 
    setParticipants(updatedParticipants);
  };

  const handleAddParticipant = () => {
    setParticipants([...participants, { ...blankParticipant }]);
  };

  const handleRemoveParticipant = index => (event) => {
    event.preventDefault();
    setParticipants(participants.filter((p, pindex) => index !== pindex));
  };

  useEffect(() => console.log(host));
  useEffect(() => console.log(participants));


  const participantId = `name-${index}`;
  const emailId = `email-${index}`;

  return(
    <div>         
      <form className={style.host}>
        <div>
          <div className={style.host_label_name}>
            <label>Host</label>
          </div>
          <div className={style.host_input_1}>
            <p className={style.participant_number}>1</p>
            <Input
              placeholder="Name..."
              name="hostName"
              id="hostName"
              value={host.hostName}
              onChange={handleHostChange}
            />
          </div>
        </div>
        
        <div>
          <div className={style.host_label_email}>
            <label>Email</label>
          </div>
          <div className={style.host_input_2}>
            <Input
              placeholder="Email..."
              name="email"
              id="email"
              value={host.email}
              onChange={handleHostChange}
            />
            <p className={style.host_info_warning}>This person is a participant too.</p>
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
                      cname="name"
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
                      cname="email"
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
    </div>
  );      
}

export default Participants;
