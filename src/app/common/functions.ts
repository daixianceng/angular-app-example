import { SortPropDir } from '@swimlane/ngx-datatable';
import { Moment } from 'moment';

import { Pagination, DatatablePage, ResponseData, Item, Items } from 'app/models';
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

export function convertObjectToItems(obj: Object): Items {
  return Object.keys(obj).map(key => {
    const item = new Item();

    item.name = key;
    item.value = obj[key];

    return item;
  });
}

export function convertModelToFormData(model: Object, formName?: string | undefined, formData?: FormData | undefined): FormData {
  formData = formData || new FormData();
  convertObjectToItems(model).forEach((item: Item) => {
    const key = formName ? `${formName}[${item.name}]` : item.name;
    if (['string', 'number', 'boolean'].includes(typeof item.value)) {
      formData.append(key, String(item.value));
    }
    if ('object' === typeof item.value) {
      convertModelToFormData(item.value, key, formData);
    }
  });
  return formData;
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

export function concatTimesFormatByISOString(
  moment1: Moment | undefined | null,
  moment2: Moment | undefined | null,
  separator: string
): string {
  const time1 = moment1 ? moment1.toISOString() : '';
  const time2 = moment2 ? moment2.toISOString() : '';
  return [time1, time2].join(separator);
}
