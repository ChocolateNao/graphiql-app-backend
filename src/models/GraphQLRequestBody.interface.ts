export default interface GraphQLRequestBody {
  apiUrl: string;
  graphqlQuery: string;
  dynamicHeaders?: Record<string, string>;
  graphqlHeaders?: Record<string, string>;
  variables?: Record<string, any>;
}