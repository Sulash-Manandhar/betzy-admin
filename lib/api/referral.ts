import { urls } from "../constant/urls";
import { ClerkToken, FindAllReferralFilter } from "../types";
import * as axios from "../utils/axios-interceptor";

export function findReferralByUserId(
  params: FindAllReferralFilter,
  token: ClerkToken
) {
  return axios.get({
    url: urls.referral.findAll,
    token,
    params,
  });
}
