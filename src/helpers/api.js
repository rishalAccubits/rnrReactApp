import axios from "axios";
import { serverUrl } from "../config/config";

export const getQuestions = async (account) => {
  console.log("here log")

    const response = await axios.get(
        `${serverUrl}/question/fetch-questionset?walletAddress=${account}`
      );
    console.log({response})
    return response.data
}

export const registerUser = async (name, email, address) => {
  const response = await axios.post(
    serverUrl + "/user/register/",
    {
      name: name,
      email: email,
      walletAddress: address
    }
    );
  return response.data
}


export const leaderBoard = async () => {
  const response = await axios.get(
    `${serverUrl}/user/leaderboard`
  );
  return response.data
}

export const getUnlockedQuestions = async (account, Id) => {
  console.log("here log")

    const response = await axios.get(
      `${serverUrl}/question/fetch-unlocked?walletAddress=${account}&questionId=${Id}`
      );
    console.log({response})
    return response.data
}

export const submitAnswer = async (id, account, option) => {
  const response = await axios.post(
    serverUrl + "/question/submit/",
    {
      questionId: id,
      walletAddress: account,
      option: option
    }
    );
  return response.data
}

export const getRegistrationStatus = async (account) => {
  console.log("here log")

    const response = await axios.get(
      `${serverUrl}/user/is-registered?walletAddress=${account}`
      );
    console.log({response})
    return response.data
}