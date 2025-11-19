import { urls } from "../constant/urls";
import {
  ClerkToken,
  Membership,
  PaginatedResponse,
  PaginationFilter,
} from "../types";
import * as axios from "../utils/axios-interceptor";

export function getAllMembership(params: PaginationFilter, token: ClerkToken) {
  return axios.get<PaginatedResponse<Membership>>({
    url: urls.membership.findAll,
    token: token,
    params,
  });
}
