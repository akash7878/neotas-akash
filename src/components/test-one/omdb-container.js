import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './omdb-detail';
import _ from 'lodash';
import './omdb.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '31ch',
    },
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function OmdbContainer() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [omdbData, setOmdbData] = useState([]);

  const handleChange = (e)=> {
    setValue(e.target.value);
  }

  const handleSearch = (e)=> {
    setSearchValue(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    const allValueSet = value.split(',');
    let omdbDataSet = [];
    for (const [ind, parsedVal] of allValueSet.entries()) {
      axios.get('http://www.omdbapi.com', {
        params: {
          i: parsedVal,
          apikey: 'd3158a00',
        }})
        .then(resp => {
          omdbDataSet.push(resp.data);
          console.log(resp);
          if(allValueSet.length-1 === ind)
            setOmdbData(omdbDataSet);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const onSearch = (e) => {
    e.preventDefault();
    let searchedDataSet = [];
    _.map(omdbData, function(o) {
      if (o.Title && o.Title.includes(searchValue)) {
        searchedDataSet.push(o);
      }
    });
    setOmdbData(searchedDataSet);
  }

  return (
    <div>
      <div className="search-row-cls">
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm}>
          <TextField id="standard-basic" value={value} label="Enter Imdb Ids" onChange={handleChange}/>
          <span className={classes.buttonRoot}>
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </span>
        </form>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSearch}>
          <TextField id="standard-basic" value={searchValue} label="Search by Title" onChange={handleSearch}/>
          <span className={classes.buttonRoot}>
            <Button variant="contained" color="secondary" type="submit">
              Search
            </Button>
          </span>
        </form>
      </div>

      <div className="omdb-card" >
      {omdbData.map((temp) => (
          <div key={temp.imdbID} id={temp.imdbID} className="omdb-card-cont">
            <div style={{width: '210px', height: '300px', backgroundImage: 'url(' + temp.Poster + ')' }}>
            </div>
            <div className="omdb-card-details">
              <p>Title: {temp.Title} </p>
              <p>Plot: {temp.Plot} </p>
              <p>Director: {temp.Director} </p>
              <p>Actor: {temp.Actors} </p>
              <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                label="Favorite"
              />
            </div>
          </div>
        ))}
      </div>

      
      
    </div>
  );
}
