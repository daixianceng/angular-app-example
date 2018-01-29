import { SortPropDir } from '@swimlane/ngx-datatable';

import { Pagination, DatatablePage, ResponseData } from 'app/models';
import { DATA_STATUS_SUCCESS } from './constants';

export function dataIsSuccess(data: ResponseData): boolean {
  return data.status === DATA_STATUS_SUCCESS;
}

export function parseJSON(string: string, defaultValue: any = false): any {
  try {
    return JSON.parse(string);
  } catch (e) {
    return defaultValue;
  }
}

export function convertSortToString(sort: SortPropDir): string {
  if (sort.dir === 'desc') {
    return '-' + sort.prop;
  }
  return sort.prop as string;
}

export function convertPaginationToDatatablePage(pagination: Pagination): DatatablePage {
  const page = new DatatablePage();

  page.count = pagination.totalCount;
  page.pageSize = pagination.perPage;
  page.limit = pagination.perPage;
  page.offset = pagination.currentPage - 1;

  return page;
}

export function objectIsEmpty(obj: Object): boolean {
  return Object.values(obj).every(value => !value);
}

export function splitTimeRange(timeRange: string | undefined | null, separator: string): string[] {
  let time1 = '', time2 = '';
  if (timeRange) {
    const dates = (timeRange as string).split(separator, 2);
    if (dates.length === 2) {
      [time1, time2] = dates;
    }
  }
  return [time1, time2];
}
