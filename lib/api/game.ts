import { urls } from "../constant/urls";
import {
  ClerkToken,
  CreateGameSchema,
  Game,
  GameFilter,
  PaginatedResponse,
} from "../types";
import * as axios from "../utils/axios-interceptor";

export function findAllGame(params: GameFilter, token: ClerkToken) {
  return axios.get<PaginatedResponse<Game>>({
    url: urls.game.findAll,
    token,
    params,
  });
}

export function createGame(data: CreateGameSchema, token: ClerkToken) {
  return axios.post({
    url: urls.game.create,
    token,
    data,
  });
}
