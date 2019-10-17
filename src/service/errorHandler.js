
import { navigate } from '@reach/router';

export const errorHandler = (error) => {
  console.log('error thrown', error);
  if(error.message === '401') {
    navigate('/login');
  }
}


