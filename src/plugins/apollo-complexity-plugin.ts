import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Plugin } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
// import { LoggerService } from '../utils/logger/logger-service';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  HeaderMap,
} from '@apollo/server';

const logger = new Logger('LoggerMiddleware');

export class QueryComplexityOverGraphQLError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'QueryComplexityOver';
  }
}

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const maxComplexity = 20;
    const { schema } = this.gqlSchemaHost;

    return {
      async responseForOperation({ request, document }) {
        if (request.operationName !== 'IntrospectionQuery') {
          // logger.log(request.operationName);

          const complexity = getComplexity({
            schema,
            operationName: request.operationName,
            query: document,
            variables: request.variables,
            estimators: [
              fieldExtensionsEstimator(),
              simpleEstimator({ defaultComplexity: 2 }),
            ],
          });

          if (complexity > maxComplexity) {
            logger.log('QueryComplexityOver', {
              complexity: complexity,
              operationName: request.operationName,
              query: request.query,
            });

            return {
              http: {
                status: 400,
                headers: new HeaderMap(),
              },
              body: {
                kind: 'single',
                singleResult: {
                  errors: [
                    {
                      message: 'Bad Request',
                    },
                  ],
                },
              },
            };
          }
          logger.log(
            `QueryComplexity:${complexity}, operationName:${request.operationName}`,
          );
        }

        return null;
      },
    };
  }
}
