import axios from 'axios';
import constants from '../constants';

const getRequest = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/myTeam.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const myTeam = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            myTeam.push(res.data[fbKey]);
          });
        }
        resolve(myTeam);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getRequest};
