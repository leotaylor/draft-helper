import axios from 'axios';
import constants from '../constants';

const getRankings = () => {
  try {
    return axios.get(`https://draft-helper.herokuapp.com/api/fantasyfootballnerd/service/draft-rankings/json/${constants.footballNerd.apiKey}`);
  } catch (error) {
    console.error(error);
  }
};

const getTiers = () => {
  try {
    return axios.get(`https://draft-helper.herokuapp.com/api/fantasyfootballnerd/service/tiers/json/${constants.footballNerd.apiKey}`);
  } catch (error) {
    console.error(error);
  }
};

export default {getRankings, getTiers};
