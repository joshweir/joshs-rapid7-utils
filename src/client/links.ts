import { getConfig } from '../config';
import { DAYS, parsev4 } from '../util';

const buildLogFilterQueryParam = (rapid7LogFilterIds: string[]): string => `%5B${rapid7LogFilterIds.map((f) => `%22${f}%22`).join(`%2C`)}%5D`;

// eg link:
// https://au.ops.insight.rapid7.com/op/AC5B73405FFF88F5BD62#/search?from=1561422046000&
//    logs=%5B%2269507e15-b1d8-4d52-b7c5-7c63f790d14f%22%2C%22ea319056-06f3-4bf3-b38d-494b5d3ebca5%22%5D&
//    query=where(%2F313af0f2-da6b-4ab8-9ac6-7ce8b8d45b45%2F)&to=1561508446000
const byOperationId = ({
  operationId,
  sentTimestamp,
  rapid7LogFilterIds,
}: {
  operationId: string;
  sentTimestamp: number;
  rapid7LogFilterIds: string[];
}): string =>
  `${`${getConfig().uiBaseUrl}/search?`}${`from=${sentTimestamp - 7 * DAYS}&to=${sentTimestamp +
    7 * DAYS}&`}${`query=where(%2F${parsev4(operationId)}%2F)&`}${`logs=${buildLogFilterQueryParam(rapid7LogFilterIds)}`}`;

export default {
  build: {
    byOperationId,
  },
};
