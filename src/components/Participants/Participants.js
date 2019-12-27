import React, { useState, useEffect } from "react"; 
import style from './Participants.module.css';

import Input from '../Input/Input';
import Button from '../Button/Button';

function Participants(index) {
  const [info, setInfo] = useState({
    date: '', 
    location: '', 
    ammount: ''
  });

  const [host, setHost] = useState({
    hostName: '',
    email: ''
  });
  
  const blankParticipant = { name: '', email: '' };
  const [participants, setParticipants] = useState([
    { ...blankParticipant },
  ]);

  const handleInfoChange = (event) => 
    setInfo({...info, [event.target.name]: event.target.value,});

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
    
    const parti = participants.concat(host);

    parti.sort(() => 0.5 - Math.random());
    const pairs = [];
  
    while (parti.length >=2) {
      const pair = [parti.pop(), parti.pop()];
      console.log('Pair: ', pair);
      pairs.push(pair);
    }
  
    console.log('All pairs', pairs)
  }
  
  useEffect(() => console.log(info));
  useEffect(() => console.log(host));
  useEffect(() => console.log(participants));


  const participantId = `name-${index}`;
  const emailId = `email-${index}`;

  return(
    <div>
      <div className={style.form_block}>
      <form className={style.info_form}>
        <h1 className={style.add_your_participants}>Add your participants</h1>
        <div className={style.party_info}>
          <div className={style.party_info_desc}>
            <p className={style.party_info_desc_date}>Date of your Secret Santa party</p>
            <p className={style.party_info_desc_location}>Location of your Secret Santa party</p>
            <p className={style.party_info_desc_ammount}>Amount to spend</p>
          </div>
          <div className={style.party_info_input}>
            <Input 
              onChange={handleInfoChange} 
              name="date" 
              placeholder="Date..."              
            />
            <Input 
              onChange={handleInfoChange} 
              name="location" 
              placeholder="Location..."
            />
            <Input 
              onChange={handleInfoChange} 
              name="ammount" 
              placeholder="Ammount in RSD..."
            />
          </div>
          <hr className={style.party_info_line} />
        </div>
      </form>
      </div>   

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
                      title="name"
                      value={value.name}                 
                      onChange={handleParticipantChange}
                  />
                </div>
                <div className={style.participant_input_email}>
                  <Input
                      placeholder="email"
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
        <Button
          submit
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );      
}

export default Participants;
