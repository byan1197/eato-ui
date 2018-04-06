import React from 'react';
import Switch from 'material-ui/Switch';

class Switches extends React.Component {
  state = {
    checkedA: false,
    checkedB: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        
        <Switch
          
          onChange={this.handleChange('checkedB')}
          value="checkedA"
          color="Secondary"
        />
       
      </div>
    );
  }
}

export default Switches;