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

export function findGame(id: string, token: ClerkToken) {
  return axios.get<Game>({
    url: urls.game.find.replace(":id", id),
    token,
  });
}

export function updateGame(
  id: string,
  data: CreateGameSchema,
  token: ClerkToken
) {
  return axios.put({
    url: urls.game.update.replace(":id", id),
    token,
    data,
  });
}
