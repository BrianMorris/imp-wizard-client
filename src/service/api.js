import Cookie from 'js-cookie';
import { navigate } from '@reach/router';

const parseJSON = function(response) {
  if(response.status >= 400) {
    throw new Error(response.status);
  }

  return response.text().then(function(text) {
    return text ? JSON.parse(text) : null;
  });
};

export const API = {
  // URL: "http://localhost:8000",
  URL: "http://ec2-54-67-52-72.us-west-1.compute.amazonaws.com",
  AUTH: {
    setSessionToken(url) {
    // add session token
    const session_token = Cookie.get('session_token');
    if(!session_token) {
      navigate('/login');
    }
    return url + '?session_token=' + session_token;
    }
  },
  Group: {
    getImplementationGroups: function(groupId) {
      const url = `${API.URL}/implementationgroup${groupId ? "/" + groupId : ""}`; 
      return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    },
    getNextQuestion: function(groupId) {
      const url = `${API.URL}/group/${groupId}/nextquestion`;
      return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    }
  },
  Question: {
    get: function(questionId) {
      const url = `${API.URL}/question${questionId ? "/" + questionId : ""}`; 
      return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    },
    postAnswer: function(questionId, answerId) {
      const url = `${API.URL}/question/${questionId}/answer`;
      return fetch(API.AUTH.setSessionToken(url), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer_id: answerId
        })
      }).then(parseJSON);
    },
    resetAll: function() {
      const url = `${API.URL}/question/reset`;
      return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    }
  },
  Import: {
    get: function(importId) {
      const url = `${API.URL}/import${importId ? "/" + importId : ""}`;
      return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    },
    activeFields: function(importId) {
      const url = `${API.URL}/import/${importId}/activefields`;
      return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    },
    downloadTemplate: function(importId) {
      // fetching download link to handle download through href button
      const url = `${API.URL}/import/${importId}/template`;
      return API.AUTH.setSessionToken(url);
    }
  
  },
  User: {
    login: function({subdomain, email, password}) {
      return fetch(`${API.URL}/login`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json",
        },
        body: JSON.stringify({
          subdomain,
          email,
          password
        })
      }).then(parseJSON);
    },
  },
  Status: {
    // Constants
    INACTIVE: 0,
    ACTIVE: 1,
    NOT_STARTED: 2,
    IN_PROGRESS: 3,
    COMPLETE: 4,
    // Methods
    get: function() {
      return fetch(`${API.URL}/status`).then(parseJSON);
    }
  }
};

