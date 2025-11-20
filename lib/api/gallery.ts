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
