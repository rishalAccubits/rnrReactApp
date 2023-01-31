import axios from "axios";
import { serverUrl } from "../config/config";

export const getQuestions = async (account) => {
    const response = await axios.get(
        `${serverUrl}/question/fetch-questionset?walletAddress=${account}`
      );
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
