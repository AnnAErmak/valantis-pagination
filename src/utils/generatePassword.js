import md5 from 'md5';
import { API_PASSWORD } from '../variables/variables';

const formatDate = (date) => date.toString().padStart(2, '0');

const generatePassword = () => {
  const date = new Date();
  const password = API_PASSWORD
        + date.getFullYear()
        + formatDate(date.getMonth() + 1)
        + formatDate(date.getDate());
  return md5(password);
};
export default generatePassword;
