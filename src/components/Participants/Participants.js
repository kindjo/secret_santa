import React, { Component } from "react"; 
import style from './Participants.module.css';

import Input from '../Input/Input';
import Button from '../Button/Button';

class Participants extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      host: "",
      email: "",
      participants: [{ name: ""}],
      emails: [{ address: ""}]
    };
  }

  handleHostNameChange = event => {
    this.setState({ host: event.target.value });
  };
  
  handleHostEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleParticipantNameChange = idx => event => {
    const newParticipants = this.state.participants.map((participant, pidx) => {
      if (idx !== pidx) return participant;
      return { ...participant, name: event.target.value };
    });

    this.setState({ participants: newParticipants });
  };

  handleParticipantEmailChange = idx => event => {
    const newEmails = this.state.emails.map((email, eidx) => {
      if (idx !== eidx) return email;
      return { ...email, address: event.target.value };
    });

    this.setState({ emails: newEmails });
  };

  handleAddParticipants = () => {
    this.setState({
      participants: this.state.participants.concat([{ name: "" }]),
      emails: this.state.emails.concat([{ address: "" }])
    });
  };

  handleRemoveParticipants = idx => (event) => {
    event.preventDefault();
    this.setState({
      participants: this.state.participants.filter((p, pidx) => idx !== pidx),
      emails: this.state.emails.filter((e, eidx) => idx !== eidx)
    });
  };

  componentDidUpdate = () => {
    console.log(this.state);
  }

    render(){
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
                  value={this.state.host}
                  onChange={this.handleHostNameChange} 
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
                  value={this.state.host}
                  onChange={this.handleHostNameChange} 
                />
                <p className={style.host_info_warning}>This person is a participant too.</p>
              </div>
            </div>
          </form>
          
          <form className={style.participant}>                
            <div className={style.participant_inputs}>
              <div>
                {this.state.participants.map((participant, idx) => (
                  <div className={style.participant_render_1}>
                    <div className={style.participant_label_name}> 
                      <label>Participant</label>
                    </div>
                    <div className={style.participant_input_name}>  
                      <p className={style.participant_number}>{idx+2}</p>
                      <Input
                        placeholder={`Name...`}
                        value={participant.name}
                        onChange={this.handleParticipantNameChange(idx)}
                      />
                    </div>  
                  </div>          
                ))}
              </div>
              
              <div>
                {this.state.emails.map((email, idx) => (
                  <div className={style.participant_render_2}>
                    <div className={style.participant_label_email}> 
                      <label>Email</label>
                    </div>
                    <div className={style.participant_input_email}>
                      <Input
                        placeholder={`Email...`}
                        value={email.address}
                        onChange={this.handleParticipantEmailChange(idx)}
                      />
                      <Button
                        remove
                        onClick={this.handleRemoveParticipants(idx)}
                      >
                        - REMOVE
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
            <div className={style.btn_add}>
              <Button 
                add
                type="button"
                onClick={this.handleAddParticipants}
              >
              + ADD PERSON
              </Button>
            </div>
          </form>
            </div>
          );
        }
}


export default Participants;
