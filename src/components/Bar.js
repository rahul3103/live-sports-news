import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  label: {
    color: '#fff'
  }
};

class Bar extends React.Component {
  render() {
    const { autoRefresh, handleChange } = this.props;

    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              Sports News
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoRefresh}
                    onChange={handleChange}
                    aria-label="RefreshSwitch"
                  />
                }
                label={
                  <div style={{ color: '#fff' }}>
                    {`Auto Refresh ${autoRefresh ? 'On' : 'Off'}`}
                  </div>
                }
              />
            </FormGroup>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Bar;
