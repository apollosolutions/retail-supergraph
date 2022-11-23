import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

const USER_HEADER = "x-user-role";

// The order of roles is important here as higher roles have bigger indexes
// and determine the order of hierarchy.
const ROLES = ['UNKNOWN', 'USER', 'PARTNER', 'ADMIN'];

function authDirective(directiveName, getUserFn) {
  const typeDirectiveArgumentMaps = {};
  return {
    authDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: type => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;
            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = function (source, args, context, info) {
                const user = getUserFn(context.headers[USER_HEADER]);
                if (!user.hasRole(requires)) {
                  throw new Error(`Not authorized. Please include the header "${USER_HEADER}" with a valid role.`);
                }
                return resolve(source, args, context, info);
              }
              return fieldConfig;
            }
          }
        }
      })
  }
}

function getUserPermissions(headerRole) {
  return {
    hasRole: (schemaRole) => {
      const headerIndex = ROLES.indexOf(headerRole);
      const schemaIndex = ROLES.indexOf(schemaRole);
      return schemaIndex >= 0 && headerIndex >= schemaIndex;
    }
  }
}

export const { authDirectiveTransformer } = authDirective('auth', getUserPermissions);
