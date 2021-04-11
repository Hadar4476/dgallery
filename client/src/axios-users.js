import axios from 'axios';

export const awsS3URL = 'https://dgallery-bucket.s3.us-east-2.amazonaws.com/';
const url = 'https://dgallery.herokuapp.com';

const instance = axios.create({
  baseURL: url,
});

export default instance;
