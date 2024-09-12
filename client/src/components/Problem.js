import React from "react";
import rounds from "../static_utils/problems.json";

function Problem({ round_no }) {
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
      {rounds.map((round) => {
        // Check if the current round matches the passed round_no
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
                      />
                      <label htmlFor={`option_${problem.id}_${index}`}>
                        {option.code}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        } else {
          return null; // Return null if the round does not match
        }
      })}
    </div>
  );
}

export default Problem;
