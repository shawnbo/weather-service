import axios from 'axios';
import { HttpUtilityOptions, HttpUtilityParams } from '../interfaces/Http';

// paramerter helper function to take an parameter object and convert it to a url parameter string
function getParamString(params: HttpUtilityParams): string {
  const paramArr: String[] = [];
  for (const [key, value] of Object.entries(params)) {
    paramArr.push(`${key}=${value}`);
  }

  return paramArr.length ? `?${paramArr.join('&')}` : '';
}

// get utility used to wrap HTTP packages
async function get<T>(url: string, options: HttpUtilityOptions): Promise<T> {
  const requestUrl = url + getParamString(options.params);

  const { data } = await axios.get(requestUrl);
  return data;
};

export { get };;
