import React, { useState } from "react";
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Confirm(props) {
  const [studentName, setStudentName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudentName("");
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    setError("");
    props.onCancel();
  };

   const validate = () => {
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    return props.onSave(studentName, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
           className="appointment__create-input text--semi-bold"
           name="name"
           type="text"
           placeholder="Enter Student Name"
           /*
             This must be a controlled component
             your code goes here
           */
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section
          className="appointment__validation">{error}
        </section>
        <InterviewerList 
         /* your code goes here */
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>   
  );
}