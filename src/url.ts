import nodeFetch, { RequestInfo } from 'node-fetch';
import { getConfig } from './config';
import { isResponseWithContinuanceLinks } from './types';

const HTTP_ACCEPTED = 202;
const HTTP_OK = 200;

const parseContinuanceLink = (data: any): string => {
  if (!isResponseWithContinuanceLinks(data)) {
    throw new Error(`no continuance link found: ${JSON.stringify(data, null, 2)}`);
  }

  const selfLink = data.links.find(({ rel }) => rel === 'Self');
  if (!selfLink) {
    throw new Error(`no self continuance link found: ${JSON.stringify(data, null, 2)}`);
  }

  return selfLink.href;
};

export const fetchWithApiKey = (url: RequestInfo) =>
  nodeFetch(url, {
    headers: {
      'x-api-key': getConfig().apiKey,
    },
  });

export const fetchR7 = async (url: RequestInfo) => {
  const response = await fetchWithApiKey(url);
  if ([HTTP_ACCEPTED, HTTP_OK].indexOf(response.status) === -1) {
    throw new Error(`in fetchR7, could not fetch ${url.toString()}: (${response.status}) ${response.statusText}`);
  }

  if (response.status === HTTP_ACCEPTED) {
    const data = await response.json();

    return fetchWithApiKey(parseContinuanceLink(data));
  }

  return response;
};
