import { Url } from "./url";

export class PagedUrl {
  data: { urls: Array<Url> };
  count: number;
  currentPage: number;
  totalPages: number;
}
