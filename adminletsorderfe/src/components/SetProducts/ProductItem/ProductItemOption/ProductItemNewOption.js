import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  makeStyles,
} from '@material-ui/core';
import ProductInput from './ProductInput';

const useStyles = makeStyles({
  root: {
    marginBottom: '20px',
    paddingBottom: '15px',
    paddingTop: '15px',
    borderBottom: '2px solid black',
  },
  bordered: {
    borderBottom: '1px solid black',
    marginBottom: '5px',
  },
  center: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: {
    marginBottom: '5px',
  },
});

const ProductItemOptionNewOption = ({ option, changeHandler, handleCancel, handleSave }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column">
      <Grid className={classes.center} item xs={12}>
        <Typography>{option.optionTitle}</Typography>
      </Grid>
      <ProductInput
        title="Title"
        name="optionTitle"
        value={option.optionTitle}
        label="required"
        changeHandler={changeHandler}
        type="text"
      />
      
      <ProductInput
        title="Minimum Volume"
        name="minVol"
        label="required"
        value={option.minVol}
        changeHandler={changeHandler}
        type="number"
      />
      <ProductInput
        title="Price"
        name="price"
        value={option.price}
        changeHandler={changeHandler}
        type="number"
      />
     
      <Grid className={classes.margin} container item direction="row">
        <Grid className={classes.center} item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={option.optionActive}
                onChange={(event) => changeHandler(event)}
                name="optionActive"
                color="primary"
              />
            }
            label="Active"
          />
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={6}>
            <Button onClick={handleCancel} variant="contained">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ProductItemOptionNewOption.propTypes = {
  option: PropTypes.shape({
    optionActive: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    optionTitle: PropTypes.string.isRequired,
    minVol: PropTypes.number.isRequired,
  }),
  changeHandler: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ProductItemOptionNewOption;
