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
    }
  },
  Question: {
    get: function(data) {
      let question_id = data && data.hasOwnProperty('question_id') && data.question_id; 
      let filter = data && data.hasOwnProperty('filter') && data.filter;

      return fetch(`${API.URL}/question${question_id ? "/" + question_id : ""}${filter ? "?filter=" + filter:""}`).then(parseJSON);
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
    }
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
    }
  
  },
  Importfield: {
    unlinkImportfield: function(answer_id, importfield_id) {
      return fetch(`${API.URL}/answer/${answer_id}/importfield/${importfield_id}`, {
        method: "DELETE", 
        headers: { "Content-Type": "application/json"}
      }).then(parseJSON);
    },
    linkImportfield: function(answer_id, importfield_id) {
      return fetch(`${API.URL}/answer/${answer_id}/importfield`, {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          importfield_id: importfield_id
        })
      }).then(parseJSON);
    },
    getAnswerFields: function(answer_id) {
      return fetch(`${API.URL}/answer/${answer_id}/importfield`).then(parseJSON);
    },
    getDropdownImporttypes: function() {
      return fetch(`${API.URL}/import`).then(parseJSON);
    },
    getDropdownImportfields: function(importtype_id) {
      return fetch(`${API.URL}/importfield?importtype_id=${importtype_id}`).then(parseJSON);
    }
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