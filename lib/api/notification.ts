import { urls } from "../constant/urls";
import type {
  ClerkToken,
  Notification,
  PaginatedResponse,
  PaginationFilter,
} from "../types";
import * as axios from "../utils/axios-interceptor";

export function notificationList(params: PaginationFilter, token: ClerkToken) {
  return axios.get<PaginatedResponse<Notification>>({
    url: urls.notification.findAll,
    token,
    params,
  });
}
