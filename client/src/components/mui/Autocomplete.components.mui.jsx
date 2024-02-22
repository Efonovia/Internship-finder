import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
  // const [selectedValue, setSelectedValue] = React.useState(props.value);
  return (
    <Autocomplete
      // disablePortal
      id="combo-box-demo"
      options={props.options}
      sx={
        { 
            width: props.width,
        }
       }
      value={props.value || null}
      onChange={(event, value) => props.onStateChange(value)}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}
