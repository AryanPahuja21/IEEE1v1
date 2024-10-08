const User = require("../models/User");
const Room = require("../models/Room");
const dotenv = require("dotenv");

dotenv.config();

// Function to execute code using the compiler API
async function executeCode(script, language, stdin) {
  const execution_data = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    script: script,
    language: language,
    stdin: stdin,
    versionIndex: "0",
  };

  try {
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      body: JSON.stringify(execution_data),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data.output.trim(); // Trim the output to remove extra spaces and newlines
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Execution failed");
  }
}

exports.getProblemID = async (req, res) => {
  try {
    const { userID } = req.query;
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const problemID = user.problemID;
    res.status(200).json({ problemID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.submitCode = async (req, res) => {
  try {
    const { userID, correctAnswerCount } = req.body;

    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.numberOfTestsPassed = correctAnswerCount;
    user.submissionTime = new Date();
    user.submitted = true;

    await user.save();

    res.status(200).json({ submitted: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function findResult(array) {
  let players = [];

  for (let i = 0; i < array.length; i += 2) {
    const ID1 = array[i].id;
    const user1 = await User.findOne({ _id: ID1 });
    const t1 = user1.numberOfTestsPassed;
    const s1 = user1.submissionTime;

    if (i === array.length - 1) {
      // Single player case
      if (t1 > 0) {
        players.push(array[i]);
      }
    } else {
      const ID2 = array[i + 1].id;
      const user2 = await User.findOne({ _id: ID2 });
      const t2 = user2.numberOfTestsPassed;
      const s2 = user2.submissionTime;

      if (s1 === null && s2 !== null) {
        players.push(array[i + 1]);
      } else if (s1 !== null && s2 === null) {
        players.push(array[i]);
      } else if (s1 === null && s2 === null) {
        players.push(array[i]);
      } else {
        if (t1 > t2) {
          players.push(array[i]);
        } else if (t1 < t2) {
          players.push(array[i + 1]);
        } else {
          if (s1 < s2) {
            players.push(array[i]);
          } else {
            players.push(array[i + 1]);
          }
        }
      }
    }
  }
  return players;
}

exports.calculateResult = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const check = room.resultCalculated;
    if (check) {
      res.status(200).json({ message: "Results calculated" });
    } else {
      const players = room.players;
      room.oldPlayers = players;
      const newPlayers = await findResult(players);
      room.players = newPlayers;
      room.resultCalculated = true;
      room.roundStarted = false;

      await room.save();

      res.status(200).json({ message: "Results calculated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
