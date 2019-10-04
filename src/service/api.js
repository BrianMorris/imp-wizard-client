const parseJSON = function(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : null;
  });
};

const API = {
  URL: "http://localhost:8000",
  Group: {
    get: function(groupId) {
      return fetch(`${API.URL}/group${groupId ? "/" + groupId : ""}`).then(parseJSON);
    },
    getNextQuestion: function(groupId) {
      return fetch(`${API.URL}/group/${groupId}/nextquestion`).then(parseJSON);
    },
    create: function({name, description, active}) {
      return fetch(`${API.URL}/group`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json"
        },
        body: JSON.stringify({name, description, active})
      }).then(parseJSON);
    }
  },
  Question: {
    get: function({question_id, filter, group_id}) {
      let queryStringParamters = '';
      if(filter) {
        queryStringParamters = "?filter=" + filter;
      } else if(group_id) {
        queryStringParamters =  "?group_id=" + group_id;
      }

      if(question_id) {
        return fetch(`${API.URL}/question${question_id ? "/" + question_id : ""}${queryStringParamters}`).then(parseJSON);
      }
      return fetch(`${API.URL}/adminquestion${queryStringParamters}`).then(parseJSON);
    },
    getDetail: function(question_id) {
      return fetch(`${API.URL}/question/${question_id}/detail`).then(parseJSON);
    },
    postAnswer: function(question_id, answer_id) {
      return fetch(`${API.URL}/question/${question_id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer_id: answer_id
        })
      }).then(parseJSON);
    },
    resetAll: function() {
      return fetch(`${API.URL}/question/reset`).then(parseJSON);
    },
    update: function({question_id, group_id, name, description, parent_answer_id, sort_order}) {
      return fetch(`${API.URL}/question/${question_id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json"
        },
        body: JSON.stringify({name, group_id, description, parent_answer_id, sort_order})
      }).then(parseJSON);
    },
    create: function({group_id, name, description, parent_answer_id, sort_order}) {
      console.log('stuff', group_id, name, parent_answer_id);
      return fetch(`${API.URL}/question`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept":"application/json"
        },
        body: JSON.stringify({group_id, name, description, parent_answer_id, sort_order})
      }).then(parseJSON);
    },
    delete: function(question_id) {
      return fetch(`${API.URL}/question/${question_id}`, {
        method: "DELETE", 
        headers: { "Content-Type": "application/json"}
      }).then(parseJSON);
    },
  },
  Import: {
    get: function(import_id) {
      return fetch(`${API.URL}/import${import_id ? "/" + import_id : ""}`).then(parseJSON);
    },
    activeFields: function(import_id) {
      return fetch(`${API.URL}/import/${import_id}/activefields`).then(parseJSON);
    },
    downloadTemplate: function(import_id) {
      return fetch(`${API.URL}/import/${import_id}/template`).then(parseJSON);
    },
  },
  Importtype: {
    get: function(active = null) {
      return fetch(`${API.URL}/importtype${active === null ? '' : '?active=' + active}`).then(parseJSON);
    },
    create: function({name, description, active}) {
      return fetch(`${API.URL}/importtype`, {
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
      return fetch(`${API.URL}/importtype/${importtype_id}`, {
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
      return fetch(`${API.URL}/answer/${answer_id}/importfield/${importfield_id}`, {
        method: "DELETE", 
        headers: { "Content-Type": "application/json"}
      }).then(parseJSON);
    },
    link: function(answer_id, importfield_id) {
      return fetch(`${API.URL}/answer/${answer_id}/importfield`, {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          importfield_id: importfield_id
        })
      }).then(parseJSON);
    },
    create: function({importtype_id, name, description}) {
      return fetch(`${API.URL}/importfield`, {
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
      return fetch(`${API.URL}/answer/${answer_id}/importfield`).then(parseJSON);
    }, 
    get: function(importtype_id) {
      return fetch(`${API.URL}/importfield?importtype_id=${importtype_id}`).then(parseJSON);
    }
  },
  Answer: {
    get: function(answer_id) {
      return fetch(`${API.URL}/answer/${answer_id}`).then(parseJSON);
    },
    update: function({answer_id, name, description, sort_order}) {
      return fetch(`${API.URL}/answer/${answer_id}`, {
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
      return fetch(`${API.URL}/answer`, {
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
      return fetch(`${API.URL}/answer/${answer_id}`, {
        method: "DELETE", 
        headers: { "Content-Type": "application/json"}
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

export default API;