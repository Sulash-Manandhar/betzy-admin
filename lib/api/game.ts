import { urls } from "../constant/urls";
import { ClerkToken, Game, GameFilter, PaginatedResponse } from "../types";
import * as axios from "../utils/axios-interceptor";

export function listGame(params: GameFilter, token: ClerkToken) {
  return axios.get<PaginatedResponse<Game>>({
    url: urls.game.findAll,
    token,
    params,
  });
}
