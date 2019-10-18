import { navigate } from '@reach/router';
import Cookie from 'js-cookie';

export const errorHandler = (error) => {
  console.log('error thrown', error);
  if(error.message === '401') {
    Cookie.remove('session_token');
    navigate('/login');
  }
}

