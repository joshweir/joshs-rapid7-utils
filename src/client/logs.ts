import { fetchR7, TContinuanceLink, isContinuanceLink } from '../url';
import { DAYS, parsev4 } from '../util';
import { getConfig } from '../config';

type TLogEvent = {
  timestamp: number;
  sequence_number: number;
  message: string;
};
const isLogEvent = (thing: any): thing is TLogEvent =>
  typeof thing === 'object' &&
  typeof thing.timestamp === 'number' &&
  typeof thing.sequence_number === 'number' &&
  typeof thing.message === 'string';

type TLogEventWithLinks = TLogEvent & {
  links: TContinuanceLink[];
};
const isLogEventWithLinks = (thing: any): thing is TLogEventWithLinks =>
  typeof thing === 'object' &&
  typeof thing.timestamp === 'number' &&
  typeof thing.sequence_number === 'number' &&
  typeof thing.message === 'string' &&
  typeof thing.links === 'object' &&
  thing.links.filter(isContinuanceLink).length === thing.links.length;

type TLogEventWithContextLink = TLogEvent & {
  contextLink: string;
};

type TResponseWithLogEvents = {
  events: TLogEvent[];
};
const isResponseWithLogEvents = (thing: any): thing is TResponseWithLogEvents =>
  typeof thing === 'object' &&
  typeof thing.events === 'object' &&
  thing.events.filter(isLogEvent).length === thing.events.length;

type TResponseWithLogEventsWithLinks = {
  events: TLogEventWithLinks[];
};
const isResponseWithLogEventsWithLinks = (thing: any): thing is TResponseWithLogEventsWithLinks =>
  typeof thing === 'object' &&
  typeof thing.events === 'object' &&
  thing.events.filter(isLogEventWithLinks).length === thing.events.length;

const toLogEventWithContextLink = (logEvent: TLogEventWithLinks): TLogEventWithContextLink => ({
  ...logEvent,
  contextLink: logEvent.links.filter(({ rel }) => rel === 'Context').map(({ href }) => href)[0],
});

export type TLogEventMaybeHighlighted = TLogEvent & {
  highlighted: boolean;
};

const toLogEventWithHighlightedLog = (highlightedSequenceNumber: number) => (
  logEvent: TLogEvent,
): TLogEventMaybeHighlighted => ({
  ...logEvent,
  highlighted: logEvent.sequence_number === highlightedSequenceNumber,
});

// eg. link:
// /log_search/query/logs/e1942dc4-a1fb-4d90-ba7a-225d557982ab/?from=1571028851000&to=1572238451000&query=where(%2F9496b930-3702-480b-8967-3f799baed16e%2F)
const buildOperationIdLink = ({
  operationId,
  sentTimestamp,
  logFilterId,
}: {
  operationId: string;
  sentTimestamp: number;
  logFilterId: string;
}): string =>
  `${getConfig().apiBaseUrl}/log_search/query/logs/${logFilterId}/?from=${sentTimestamp - 7 * DAYS}&to=${sentTimestamp +
    7 * DAYS}&query=where(%2F${parsev4(operationId)}%2F)`;

// eg. link:
// /log_search/query/logs/e1942dc4-a1fb-4d90-ba7a-225d557982ab/?from=1571028851000&to=1572238451000&query=where(%2F9496b930-3702-480b-8967-3f799baed16e%2F)
const buildQueryLink = ({
  query,
  sentTimestamp,
  logFilterId,
}: {
  query: string;
  sentTimestamp: number;
  logFilterId: string;
}): string =>
  `${getConfig().apiBaseUrl}/log_search/query/logs/${logFilterId}/?from=${sentTimestamp - 7 * DAYS}&to=${sentTimestamp +
    7 * DAYS}&query=where(${query})`;

const byOperationId = async ({
  operationId,
  sentTimestamp,
  rapid7LogFilterIds
}: {
  operationId: string;
  sentTimestamp: number;
  rapid7LogFilterIds: string[];
}) => {
  const logEvents: TLogEventWithLinks[] = [];
  for (const logFilterId of rapid7LogFilterIds) {
    const response = await fetchR7(buildOperationIdLink({ operationId, sentTimestamp, logFilterId }));
    const data = await response.json();
    if (!isResponseWithLogEventsWithLinks(data)) {
      throw new Error(`response does not contain log events: ${JSON.stringify(data, null, 2)}`);
    }

    logEvents.push(...data.events.slice(0, getConfig().maxLogEventsPerFilter));
  }

  return logEvents.sort((a, b) => a.timestamp - b.timestamp).map(toLogEventWithContextLink);
};

const byQuery = async ({
  query,
  sentTimestamp,
  rapid7LogFilterIds,
}: {
  query: string;
  sentTimestamp: number;
  rapid7LogFilterIds: string[];
}) => {
  const logEvents: TLogEventWithLinks[] = [];
  for (const logFilterId of rapid7LogFilterIds) {
    const response = await fetchR7(buildQueryLink({ query, sentTimestamp, logFilterId }));
    const data = await response.json();
    if (!isResponseWithLogEventsWithLinks(data)) {
      throw new Error(`response does not contain log events: ${JSON.stringify(data, null, 2)}`);
    }

    logEvents.push(...data.events.slice(0, getConfig().maxLogEventsPerFilter));
  }

  return logEvents.sort((a, b) => a.timestamp - b.timestamp).map(toLogEventWithContextLink);
};

const surroundingContext = async (contextUrl: string, sequenceNumber: number) => {
  const response = await fetchR7(contextUrl);
  const data = await response.json();
  if (!isResponseWithLogEvents(data)) {
    throw new Error(`response does not contain log events: ${JSON.stringify(data, null, 2)}`);
  }

  return data.events.map(toLogEventWithHighlightedLog(sequenceNumber));
};

export default {
  get: {
    byQuery,
    byOperationId,
    surroundingContext,
  },
};
