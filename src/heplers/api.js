import axios from "axios";
import { serverUrl } from "../config/config";

export const getQuestions = async (account) => {
    const response = await axios.get(
        `${serverUrl}/question/fetch-questionset?walletAddress=${account}`
      );
    return response.data
}