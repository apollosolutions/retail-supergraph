import { RemoteGraphQLDataSource } from "@apollo/gateway";

export class DataSourceWithHeaders extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const headers = context?.headers || {};
    for (const key in headers) {
      request.http.headers.set(key, headers[key]);
    }
  }
}
