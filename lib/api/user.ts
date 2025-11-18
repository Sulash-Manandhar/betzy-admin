import { urls } from "../constant/urls";
import { ClerkToken, PaginatedResponse, User } from "../types";
import * as axios from "../utils/axios-interceptor";

export function list(params: Record<string, string>, token: ClerkToken) {
  return axios.get<PaginatedResponse<User>>({
    url: urls.user.findAll,
    params,
    token,
  });
}
