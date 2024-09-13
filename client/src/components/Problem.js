import React, { useState } from "react";
import rounds from "../static_utils/problems.json";
import axios from "axios";

function Problem({ userID, round_no }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (problemId, optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [problemId]: optionId,
    });
  };

  const handleSubmit = async () => {
    let correctAnswersCount = 0;

    const currentRound = rounds.find((round) => round.round_id === round_no);

    if (currentRound) {
      currentRound.problems.forEach((problem) => {
        const selectedOptionId = selectedAnswers[problem.id];
        const correctOption = problem.options.find(
          (option) => option.is_correct
        );

        if (correctOption && selectedOptionId === correctOption.option_id) {
          correctAnswersCount += 1;
        }
      });

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/tournament/match/submitCode`,
          {
            userID,
            correctAnswersCount,
          }
        );
        console.log(response.data);

        const { submitted } = response.data;

        setSubmitted(submitted);
      } catch (error) {
        console.error("Error submitting:", error);
      }

      setScore(correctAnswersCount);
    }
  };

  return (
    <div
      style={{
        marginTop: "3rem",
        fontFamily: "'Poppins', sans-serif",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      }}
    >
      {!submitted ? (
        <>
          {rounds.map((round) => {
            if (round.round_id === round_no) {
              return (
                <div key={round.round_id}>
                  {round.problems.map((problem) => (
                    <div key={problem.id}>
                      <h2>{problem.title}</h2>
                      <p>{problem.description}</p>
                      <p>Difficulty: {problem.difficulty}</p>
                      {problem.options.map((option, index) => (
                        <div key={index}>
                          <input
                            type="radio"
                            id={`option_${problem.id}_${index}`}
                            name={problem.id}
                            value={option.option_id}
                            onChange={() =>
                              handleOptionChange(problem.id, option.option_id)
                            }
                          />
                          <label htmlFor={`option_${problem.id}_${index}`}>
                            {option.code}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button onClick={handleSubmit} style={{backgroundColor:'black',color:'white',marginTop:'12px',marginLeft:'430px',borderRadius:'6px',height:'40px',width:'80px',cursor:'pointer'}}>Submit</button>
                </div>
              );
            } else {
              return null;
            }
          })}
        </>
      ) : (
        <p>
          {" "}
          Thank you for submitting your answers! Wait for others to finish the
          round.
        </p>
      )}
    </div>
  );
}

export default Problem;
