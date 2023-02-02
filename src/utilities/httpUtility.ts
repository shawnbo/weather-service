import axios from 'axios';
import { debuglog } from 'util';

const log = debuglog('test');

type HttpUtilityOptions = {
  params: Params;
};

type Params = {
  [key: string]: unknown;
};

function getParamString(params: Params): string {
  const paramArr: String[] = [];
  for (const [key, value] of Object.entries(params)) {
    paramArr.push(`${key}=${value}`);
  }

  return paramArr.length ? `?${paramArr.join('&')}` : '';
}

async function get<T>(url: string, options: HttpUtilityOptions): Promise<T> {
  const requestUrl = url + getParamString(options.params);

  const { data } = await axios.get(requestUrl);
  return data;
};

export { get };;