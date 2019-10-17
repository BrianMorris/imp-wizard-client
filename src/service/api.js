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
  API_AUTH: {
    setSessionToken(url) {
    // add session token
    const session_token = Cookie.get('session_token');
    if(!session_token) {
      navigate('/login');
    }
    return url + '?session_token=' + session_token;
    }
  },
  URL: "http://localhost:8000",
  Group: {
    get: function(groupId) {
      const url = `${API.URL}/group${groupId ? "/" + groupId : ""}`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
    getNextQuestion: function(groupId) {
      const url = `${API.URL}/group/${groupId}/nextquestion`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
    create: function({name, description, active}) {
      const url = `${API.URL}/group`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json"
        },
        body: JSON.stringify({name, description, active}),
      }).then(parseJSON);
    }
  },
  Question: {
    get: function({question_id, filter, group_id}) {
      let queryStringParameters = '';
      if(filter) {
        queryStringParameters = "&filter=" + filter;
      } else if(group_id) {
        queryStringParameters =  "&group_id=" + group_id;
      }

      if(question_id) {

        const url = `${API.URL}/question${question_id ? "/" + question_id : ""}`;
        return fetch(API.API_AUTH.setSessionToken(url) + queryStringParameters).then(parseJSON);
      }
      else {
        const url = `${API.URL}/adminquestion`;
        return fetch(API.API_AUTH.setSessionToken(url) + queryStringParameters).then(parseJSON);
      }
    },
    getDetail: function(question_id) {
      const url = `${API.URL}/question/${question_id}/detail`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
    postAnswer: function(question_id, answer_id) {
      const url = `${API.URL}/question/${question_id}/answer`
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer_id: answer_id
        })
      }).then(parseJSON);
    },
    resetAll: function() {
      const url = `${API.URL}/question/reset`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
    update: function({question_id, group_id, name, description, parent_answer_id, sort_order}) {
      const url = `${API.URL}/question/${question_id}`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json"
        },
        body: JSON.stringify({name, group_id, description, parent_answer_id, sort_order})
      }).then(parseJSON);
    },
    create: function({group_id, name, description, parent_answer_id, sort_order}) {
      const url = `${API.URL}/question`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json"
        },
        body: JSON.stringify({group_id, name, description, parent_answer_id, sort_order})
      }).then(parseJSON);
    },
    delete: function(question_id) {
      const url = `${API.URL}/question/${question_id}`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "DELETE", 
        headers: { "Content-Type": "application/json"}
      }).then(parseJSON);
    },
  },
  Import: {
    get: function(import_id) {
      const url = `${API.URL}/import${import_id ? "/" + import_id : ""}`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
    activeFields: function(import_id) {
      const url = `${API.URL}/import/${import_id}/activefields`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
    downloadTemplate: function(import_id) {
      const url = `${API.URL}/import/${import_id}/template`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
  },
  Importtype: {
    get: function(active = null) {
      const url = `${API.URL}/importtype`;
      return fetch(API.API_AUTH.setSessionToken(url) + `${active === null ? '' : '&active=' + active}`).then(parseJSON);
    },
    create: function({name, description, active}) {
      const url = `${API.URL}/importtype`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          name,
          description,
          active
        })
      }).then(parseJSON);
    },
    update: function(importtype_id, {name, description, active}) {
      const url = `${API.URL}/importtype/${importtype_id}`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          name,
          description,
          active
        })
      }).then(parseJSON);
    },
  },
  Importfield: {
    unlink: function(answer_id, importfield_id) {
      const url = `${API.URL}/answer/${answer_id}/importfield/${importfield_id}`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "DELETE", 
        headers: { "Content-Type": "application/json"}
      }).then(parseJSON);
    },
    link: function(answer_id, importfield_id) {
      const url = `${API.URL}/answer/${answer_id}/importfield`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          importfield_id: importfield_id
        })
      }).then(parseJSON);
    },
    create: function({importtype_id, name, description}) {
      const url = `${API.URL}/importfield`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          importtype_id,
          name,
          description
        })
      }).then(parseJSON);
    }, 
    getAnswerFields: function(answer_id) {
      const url = `${API.URL}/answer/${answer_id}/importfield`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    }, 
    get: function(importtype_id) {
      const url = `${API.URL}/importfield`;
      return fetch(API.API_AUTH.setSessionToken(url) + `&importtype_id=${importtype_id}`).then(parseJSON);
    }
  },
  Answer: {
    get: function(answer_id) {
      const url = `${API.URL}/answer/${answer_id}`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    },
    update: function({answer_id, name, description, sort_order}) {
      const url = `${API.URL}/answer/${answer_id}`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json"
        },
        body: JSON.stringify({
          name: name,
          description: description,
          sort_order:sort_order
        })
      }).then(parseJSON);
    },
    create: function({question_id, name, description, sort_order}) {
      const url = `${API.URL}/answer`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json",
        },
        body: JSON.stringify({
          question_id,
          name,
          description,
          sort_order,
        })
      }).then(parseJSON);
    },
    delete: function(answer_id) {
      const url = `${API.URL}/answer/${answer_id}`;
      return fetch(API.API_AUTH.setSessionToken(url), {
        method: "DELETE", 
        headers: { "Content-Type": "application/json"}
      }).then(parseJSON);
    },
  },
  User: {
    login: function({subdomain, email, password}) {
      const url = `${API.URL}/adminlogin`;
      return fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json",
        },
        body: JSON.stringify({
          subdomain,
          email,
          password
        }),
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
      const url = `${API.URL}/status`;
      return fetch(API.API_AUTH.setSessionToken(url)).then(parseJSON);
    }
  }
};
