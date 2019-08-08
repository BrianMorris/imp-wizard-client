const parseJSON = function(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : null;
  });
};

const API = {
  URL: "https://fda9190a.ngrok.io",
  Group: {
    get: function(groupId) {
      return fetch(`${API.URL}/group${groupId ? "/" + groupId : ""}`).then(parseJSON);
    },
    getNextQuestion: function(groupId) {
      return fetch(`${API.URL}/group/${groupId}/nextquestion`).then(parseJSON);
    }
  },
  Question: {
    get: function(questionId) {
      return fetch(`${API.URL}/question${questionId ? "/" + questionId : ""}`).then(parseJSON);
    },
    postAnswer: function(questionId, answerId) {
      return fetch(`${API.URL}/question/${questionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer_id: answerId
        })
      }).then(parseJSON);
    },
    resetAll: function() {
      return fetch(`${API.URL}/question/reset`).then(parseJSON);
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
