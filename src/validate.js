const validate = (val) => {
  const errors = {};

  if (!val.location) {
    errors.location = 'Required';
  }
  if (!val.ammount) {
    errors.ammount = 'Required';
  } else if (isNaN(Number(val.ammount))){
    errors.ammount = 'Must be a number'
  }

  if (!val.hostName) {
    errors.hostName = 'Required';
  }
  if (!val.hostEmail) {
    errors.hostEmail = 'Required';
  } else if (!/^.+@.+$/i.test(val.hostEmail)) {
    errors.hostEmail = 'Invalid email address';
  }
   
  if (val.name !== undefined) {
    errors.name = [];
    val.name.forEach((value, index) => {
      if (!value){
        errors.name[index] = 'Required';
      }
    });
  }
  
  console.log(val.name);
  return errors;
};

export default validate;