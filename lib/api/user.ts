import { urls } from "../constant/urls";
import { ClerkToken, PaginatedResponse, User, UserFilter } from "../types";
import * as axios from "../utils/axios-interceptor";

export function list(params: UserFilter, token: ClerkToken) {
  return axios.get<PaginatedResponse<User>>({
    url: urls.user.findAll,
    params,
    token,
  });
}
