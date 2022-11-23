import { RemoteGraphQLDataSource } from "@apollo/gateway";

/**
 * Forward all headers that start with "x" to subgraphs
 */
export class DataSourceWithHeaders extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const headers = context?.headers || {};
    for (const key in headers) {
      if (key.startsWith("x")) {
        request.http.headers.set(key, headers[key]);
      }
    }
  }
}
