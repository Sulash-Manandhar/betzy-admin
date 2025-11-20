import { urls } from "../constant/urls";
import {
  ClerkToken,
  ImageType,
  PaginatedResponse,
  PaginationFilter,
} from "../types";
import * as axios from "../utils/axios-interceptor";

export function getGalleryImages(params: PaginationFilter, token: ClerkToken) {
  return axios.get<PaginatedResponse<ImageType>>({
    url: urls.gallery.findAll,
    token: token,
    params,
  });
}

export function createManyImage(data: FormData, token: ClerkToken) {
  return axios.formdataPost({
    url: urls.gallery.createMany,
    token,
    data,
  });
}

export function deleteImage(id: string, token: ClerkToken) {
  return axios.del({
    url: urls.gallery.destroy.replace(":id", id),
    token,
  });
}
