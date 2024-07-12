const API = "https://668b76a30b61b8d23b09a72c.mockapi.io/survey"

const surveyForm = document.getElementById("survey-form");
const surveyBox = document.getElementById("survey-box");

async function getSurveyData() {
    try {
        const res = await fetch(API, {
            method: "GET",
        });
        const data = await res.json();
        mapAllSurvey(data);
    } catch (error) {
        console.log(error);

    }
}
async function addNewSurveyData(payload) {
    try {
        const res = await fetch(API, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await res.json();
        appendNewSurvey(data);
    } catch (error) {
        console.log(error);
    }
}
async function deleteSurvey(id, parent) {
    try {
        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data) {
            parent.remove();
        } else {
            console.log("error occured");
        }
    } catch (error) {
        console.log(error);
    }
}

getSurveyData("");
function appendNewSurvey(survey) {
    const mainDiv = document.createElement("div");
    mainDiv.className = "card";
    mainDiv.innerHTML += `
    <h2>${survey.name}</h2>
    <p>Email :<span id="email-value">${survey.email}</span></p>
  <p>Age :<span id="age-value">${survey.age}</span></p>
  <p>Gender :<span id="gender-value">${survey.gender}</span></p>
  <p>Feedback :<span id="feedback-value">${survey.feedback}</span></p>
  <div class="action-btn">
  <button data-id=${survey.id} id="del-btn" class="btn">Delete</button>
  </div>
    `;
    surveyBox.append(mainDiv);

}
surveyForm.innerHTML += `
<form>
            <h2>Feedback Form</h2>
            <input type="text" name="name" required placeholder="Enter Your Name" class="input-text" id="input-name" />
            <div>
            <input type="number" name="age" required placeholder="Enter Your Age" class="input-age" id="input-age" />
            <label for="exampleFormControlSelect1">Gender</label>
    <select class="gender" id="exampleFormControlSelect1">
      <option>Male</option>
      <option>Female</option>
    </select></div>
            <input type="email" name="email" required placeholder="Enter Your Email" class="input-text"
                id="input-email" />
            <input type="text" name="feedback" required placeholder="Your Feedback Here..." class="input-text"
                id="input-feedback" rows="3" />
                <button type="submit" id="add-feedback" class="btn">Add feedback</button>
        </form>
        `;
const input_name = document.querySelector("#input-name");
const input_gender = document.querySelector(".gender");
const input_email = document.querySelector("#input-email");
const input_age = document.querySelector("#input-age");
const input_feedback = document.querySelector("#input-feedback");
const addSurv = document.querySelector("#add-feedback");

function mapAllSurvey(survey) {
    survey.map((value) => {
        appendNewSurvey(value);
    });
}
function clearForm() {
    input_name.value = "";
    input_email.value = "";
    input_gender.value = "";
    input_feedback.value = "";
    input_age.value = "";
}
function getUserInputValues() {
    return {
        name: input_name.value,
        email: input_email.value,
        age: input_age.value,
        gender: input_gender.value,
        feedback: input_feedback.value,
    };
}
surveyForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id == "add-feedback") {
        const payload = getUserInputValues();
        addNewSurveyData(payload);
        clearForm();
    }
});
surveyBox.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    const parentNode = event.target.parentNode.parentNode;
    if (event.target.id == "del-btn") {
        deleteSurvey(id, parentNode);
    }
});