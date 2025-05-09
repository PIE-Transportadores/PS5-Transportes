
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model cadastro_funcionario
 * 
 */
export type cadastro_funcionario = $Result.DefaultSelection<Prisma.$cadastro_funcionarioPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cadastro_funcionarios
 * const cadastro_funcionarios = await prisma.cadastro_funcionario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cadastro_funcionarios
   * const cadastro_funcionarios = await prisma.cadastro_funcionario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cadastro_funcionario`: Exposes CRUD operations for the **cadastro_funcionario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cadastro_funcionarios
    * const cadastro_funcionarios = await prisma.cadastro_funcionario.findMany()
    * ```
    */
  get cadastro_funcionario(): Prisma.cadastro_funcionarioDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    cadastro_funcionario: 'cadastro_funcionario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cadastro_funcionario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      cadastro_funcionario: {
        payload: Prisma.$cadastro_funcionarioPayload<ExtArgs>
        fields: Prisma.cadastro_funcionarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cadastro_funcionarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cadastro_funcionarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload>
          }
          findFirst: {
            args: Prisma.cadastro_funcionarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cadastro_funcionarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload>
          }
          findMany: {
            args: Prisma.cadastro_funcionarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload>[]
          }
          create: {
            args: Prisma.cadastro_funcionarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload>
          }
          createMany: {
            args: Prisma.cadastro_funcionarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.cadastro_funcionarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload>
          }
          update: {
            args: Prisma.cadastro_funcionarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload>
          }
          deleteMany: {
            args: Prisma.cadastro_funcionarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cadastro_funcionarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.cadastro_funcionarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cadastro_funcionarioPayload>
          }
          aggregate: {
            args: Prisma.Cadastro_funcionarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCadastro_funcionario>
          }
          groupBy: {
            args: Prisma.cadastro_funcionarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<Cadastro_funcionarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.cadastro_funcionarioCountArgs<ExtArgs>
            result: $Utils.Optional<Cadastro_funcionarioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cadastro_funcionario?: cadastro_funcionarioOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model cadastro_funcionario
   */

  export type AggregateCadastro_funcionario = {
    _count: Cadastro_funcionarioCountAggregateOutputType | null
    _avg: Cadastro_funcionarioAvgAggregateOutputType | null
    _sum: Cadastro_funcionarioSumAggregateOutputType | null
    _min: Cadastro_funcionarioMinAggregateOutputType | null
    _max: Cadastro_funcionarioMaxAggregateOutputType | null
  }

  export type Cadastro_funcionarioAvgAggregateOutputType = {
    id: number | null
    cpf: number | null
  }

  export type Cadastro_funcionarioSumAggregateOutputType = {
    id: number | null
    cpf: number | null
  }

  export type Cadastro_funcionarioMinAggregateOutputType = {
    id: number | null
    nome: string | null
    cpf: number | null
    turno: string | null
    alojamento: string | null
  }

  export type Cadastro_funcionarioMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    cpf: number | null
    turno: string | null
    alojamento: string | null
  }

  export type Cadastro_funcionarioCountAggregateOutputType = {
    id: number
    nome: number
    cpf: number
    turno: number
    alojamento: number
    _all: number
  }


  export type Cadastro_funcionarioAvgAggregateInputType = {
    id?: true
    cpf?: true
  }

  export type Cadastro_funcionarioSumAggregateInputType = {
    id?: true
    cpf?: true
  }

  export type Cadastro_funcionarioMinAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    turno?: true
    alojamento?: true
  }

  export type Cadastro_funcionarioMaxAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    turno?: true
    alojamento?: true
  }

  export type Cadastro_funcionarioCountAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    turno?: true
    alojamento?: true
    _all?: true
  }

  export type Cadastro_funcionarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cadastro_funcionario to aggregate.
     */
    where?: cadastro_funcionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cadastro_funcionarios to fetch.
     */
    orderBy?: cadastro_funcionarioOrderByWithRelationInput | cadastro_funcionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cadastro_funcionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cadastro_funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cadastro_funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cadastro_funcionarios
    **/
    _count?: true | Cadastro_funcionarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Cadastro_funcionarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Cadastro_funcionarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Cadastro_funcionarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Cadastro_funcionarioMaxAggregateInputType
  }

  export type GetCadastro_funcionarioAggregateType<T extends Cadastro_funcionarioAggregateArgs> = {
        [P in keyof T & keyof AggregateCadastro_funcionario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCadastro_funcionario[P]>
      : GetScalarType<T[P], AggregateCadastro_funcionario[P]>
  }




  export type cadastro_funcionarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cadastro_funcionarioWhereInput
    orderBy?: cadastro_funcionarioOrderByWithAggregationInput | cadastro_funcionarioOrderByWithAggregationInput[]
    by: Cadastro_funcionarioScalarFieldEnum[] | Cadastro_funcionarioScalarFieldEnum
    having?: cadastro_funcionarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Cadastro_funcionarioCountAggregateInputType | true
    _avg?: Cadastro_funcionarioAvgAggregateInputType
    _sum?: Cadastro_funcionarioSumAggregateInputType
    _min?: Cadastro_funcionarioMinAggregateInputType
    _max?: Cadastro_funcionarioMaxAggregateInputType
  }

  export type Cadastro_funcionarioGroupByOutputType = {
    id: number
    nome: string
    cpf: number
    turno: string
    alojamento: string
    _count: Cadastro_funcionarioCountAggregateOutputType | null
    _avg: Cadastro_funcionarioAvgAggregateOutputType | null
    _sum: Cadastro_funcionarioSumAggregateOutputType | null
    _min: Cadastro_funcionarioMinAggregateOutputType | null
    _max: Cadastro_funcionarioMaxAggregateOutputType | null
  }

  type GetCadastro_funcionarioGroupByPayload<T extends cadastro_funcionarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Cadastro_funcionarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Cadastro_funcionarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Cadastro_funcionarioGroupByOutputType[P]>
            : GetScalarType<T[P], Cadastro_funcionarioGroupByOutputType[P]>
        }
      >
    >


  export type cadastro_funcionarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cpf?: boolean
    turno?: boolean
    alojamento?: boolean
  }, ExtArgs["result"]["cadastro_funcionario"]>



  export type cadastro_funcionarioSelectScalar = {
    id?: boolean
    nome?: boolean
    cpf?: boolean
    turno?: boolean
    alojamento?: boolean
  }

  export type cadastro_funcionarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cpf" | "turno" | "alojamento", ExtArgs["result"]["cadastro_funcionario"]>

  export type $cadastro_funcionarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cadastro_funcionario"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      cpf: number
      turno: string
      alojamento: string
    }, ExtArgs["result"]["cadastro_funcionario"]>
    composites: {}
  }

  type cadastro_funcionarioGetPayload<S extends boolean | null | undefined | cadastro_funcionarioDefaultArgs> = $Result.GetResult<Prisma.$cadastro_funcionarioPayload, S>

  type cadastro_funcionarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cadastro_funcionarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Cadastro_funcionarioCountAggregateInputType | true
    }

  export interface cadastro_funcionarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cadastro_funcionario'], meta: { name: 'cadastro_funcionario' } }
    /**
     * Find zero or one Cadastro_funcionario that matches the filter.
     * @param {cadastro_funcionarioFindUniqueArgs} args - Arguments to find a Cadastro_funcionario
     * @example
     * // Get one Cadastro_funcionario
     * const cadastro_funcionario = await prisma.cadastro_funcionario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cadastro_funcionarioFindUniqueArgs>(args: SelectSubset<T, cadastro_funcionarioFindUniqueArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cadastro_funcionario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cadastro_funcionarioFindUniqueOrThrowArgs} args - Arguments to find a Cadastro_funcionario
     * @example
     * // Get one Cadastro_funcionario
     * const cadastro_funcionario = await prisma.cadastro_funcionario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cadastro_funcionarioFindUniqueOrThrowArgs>(args: SelectSubset<T, cadastro_funcionarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cadastro_funcionario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cadastro_funcionarioFindFirstArgs} args - Arguments to find a Cadastro_funcionario
     * @example
     * // Get one Cadastro_funcionario
     * const cadastro_funcionario = await prisma.cadastro_funcionario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cadastro_funcionarioFindFirstArgs>(args?: SelectSubset<T, cadastro_funcionarioFindFirstArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cadastro_funcionario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cadastro_funcionarioFindFirstOrThrowArgs} args - Arguments to find a Cadastro_funcionario
     * @example
     * // Get one Cadastro_funcionario
     * const cadastro_funcionario = await prisma.cadastro_funcionario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cadastro_funcionarioFindFirstOrThrowArgs>(args?: SelectSubset<T, cadastro_funcionarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cadastro_funcionarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cadastro_funcionarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cadastro_funcionarios
     * const cadastro_funcionarios = await prisma.cadastro_funcionario.findMany()
     * 
     * // Get first 10 Cadastro_funcionarios
     * const cadastro_funcionarios = await prisma.cadastro_funcionario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cadastro_funcionarioWithIdOnly = await prisma.cadastro_funcionario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cadastro_funcionarioFindManyArgs>(args?: SelectSubset<T, cadastro_funcionarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cadastro_funcionario.
     * @param {cadastro_funcionarioCreateArgs} args - Arguments to create a Cadastro_funcionario.
     * @example
     * // Create one Cadastro_funcionario
     * const Cadastro_funcionario = await prisma.cadastro_funcionario.create({
     *   data: {
     *     // ... data to create a Cadastro_funcionario
     *   }
     * })
     * 
     */
    create<T extends cadastro_funcionarioCreateArgs>(args: SelectSubset<T, cadastro_funcionarioCreateArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cadastro_funcionarios.
     * @param {cadastro_funcionarioCreateManyArgs} args - Arguments to create many Cadastro_funcionarios.
     * @example
     * // Create many Cadastro_funcionarios
     * const cadastro_funcionario = await prisma.cadastro_funcionario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cadastro_funcionarioCreateManyArgs>(args?: SelectSubset<T, cadastro_funcionarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cadastro_funcionario.
     * @param {cadastro_funcionarioDeleteArgs} args - Arguments to delete one Cadastro_funcionario.
     * @example
     * // Delete one Cadastro_funcionario
     * const Cadastro_funcionario = await prisma.cadastro_funcionario.delete({
     *   where: {
     *     // ... filter to delete one Cadastro_funcionario
     *   }
     * })
     * 
     */
    delete<T extends cadastro_funcionarioDeleteArgs>(args: SelectSubset<T, cadastro_funcionarioDeleteArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cadastro_funcionario.
     * @param {cadastro_funcionarioUpdateArgs} args - Arguments to update one Cadastro_funcionario.
     * @example
     * // Update one Cadastro_funcionario
     * const cadastro_funcionario = await prisma.cadastro_funcionario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cadastro_funcionarioUpdateArgs>(args: SelectSubset<T, cadastro_funcionarioUpdateArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cadastro_funcionarios.
     * @param {cadastro_funcionarioDeleteManyArgs} args - Arguments to filter Cadastro_funcionarios to delete.
     * @example
     * // Delete a few Cadastro_funcionarios
     * const { count } = await prisma.cadastro_funcionario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cadastro_funcionarioDeleteManyArgs>(args?: SelectSubset<T, cadastro_funcionarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cadastro_funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cadastro_funcionarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cadastro_funcionarios
     * const cadastro_funcionario = await prisma.cadastro_funcionario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cadastro_funcionarioUpdateManyArgs>(args: SelectSubset<T, cadastro_funcionarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cadastro_funcionario.
     * @param {cadastro_funcionarioUpsertArgs} args - Arguments to update or create a Cadastro_funcionario.
     * @example
     * // Update or create a Cadastro_funcionario
     * const cadastro_funcionario = await prisma.cadastro_funcionario.upsert({
     *   create: {
     *     // ... data to create a Cadastro_funcionario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cadastro_funcionario we want to update
     *   }
     * })
     */
    upsert<T extends cadastro_funcionarioUpsertArgs>(args: SelectSubset<T, cadastro_funcionarioUpsertArgs<ExtArgs>>): Prisma__cadastro_funcionarioClient<$Result.GetResult<Prisma.$cadastro_funcionarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cadastro_funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cadastro_funcionarioCountArgs} args - Arguments to filter Cadastro_funcionarios to count.
     * @example
     * // Count the number of Cadastro_funcionarios
     * const count = await prisma.cadastro_funcionario.count({
     *   where: {
     *     // ... the filter for the Cadastro_funcionarios we want to count
     *   }
     * })
    **/
    count<T extends cadastro_funcionarioCountArgs>(
      args?: Subset<T, cadastro_funcionarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Cadastro_funcionarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cadastro_funcionario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Cadastro_funcionarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Cadastro_funcionarioAggregateArgs>(args: Subset<T, Cadastro_funcionarioAggregateArgs>): Prisma.PrismaPromise<GetCadastro_funcionarioAggregateType<T>>

    /**
     * Group by Cadastro_funcionario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cadastro_funcionarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cadastro_funcionarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cadastro_funcionarioGroupByArgs['orderBy'] }
        : { orderBy?: cadastro_funcionarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cadastro_funcionarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCadastro_funcionarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cadastro_funcionario model
   */
  readonly fields: cadastro_funcionarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cadastro_funcionario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cadastro_funcionarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cadastro_funcionario model
   */
  interface cadastro_funcionarioFieldRefs {
    readonly id: FieldRef<"cadastro_funcionario", 'Int'>
    readonly nome: FieldRef<"cadastro_funcionario", 'String'>
    readonly cpf: FieldRef<"cadastro_funcionario", 'Int'>
    readonly turno: FieldRef<"cadastro_funcionario", 'String'>
    readonly alojamento: FieldRef<"cadastro_funcionario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * cadastro_funcionario findUnique
   */
  export type cadastro_funcionarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * Filter, which cadastro_funcionario to fetch.
     */
    where: cadastro_funcionarioWhereUniqueInput
  }

  /**
   * cadastro_funcionario findUniqueOrThrow
   */
  export type cadastro_funcionarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * Filter, which cadastro_funcionario to fetch.
     */
    where: cadastro_funcionarioWhereUniqueInput
  }

  /**
   * cadastro_funcionario findFirst
   */
  export type cadastro_funcionarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * Filter, which cadastro_funcionario to fetch.
     */
    where?: cadastro_funcionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cadastro_funcionarios to fetch.
     */
    orderBy?: cadastro_funcionarioOrderByWithRelationInput | cadastro_funcionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cadastro_funcionarios.
     */
    cursor?: cadastro_funcionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cadastro_funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cadastro_funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cadastro_funcionarios.
     */
    distinct?: Cadastro_funcionarioScalarFieldEnum | Cadastro_funcionarioScalarFieldEnum[]
  }

  /**
   * cadastro_funcionario findFirstOrThrow
   */
  export type cadastro_funcionarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * Filter, which cadastro_funcionario to fetch.
     */
    where?: cadastro_funcionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cadastro_funcionarios to fetch.
     */
    orderBy?: cadastro_funcionarioOrderByWithRelationInput | cadastro_funcionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cadastro_funcionarios.
     */
    cursor?: cadastro_funcionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cadastro_funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cadastro_funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cadastro_funcionarios.
     */
    distinct?: Cadastro_funcionarioScalarFieldEnum | Cadastro_funcionarioScalarFieldEnum[]
  }

  /**
   * cadastro_funcionario findMany
   */
  export type cadastro_funcionarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * Filter, which cadastro_funcionarios to fetch.
     */
    where?: cadastro_funcionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cadastro_funcionarios to fetch.
     */
    orderBy?: cadastro_funcionarioOrderByWithRelationInput | cadastro_funcionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cadastro_funcionarios.
     */
    cursor?: cadastro_funcionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cadastro_funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cadastro_funcionarios.
     */
    skip?: number
    distinct?: Cadastro_funcionarioScalarFieldEnum | Cadastro_funcionarioScalarFieldEnum[]
  }

  /**
   * cadastro_funcionario create
   */
  export type cadastro_funcionarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * The data needed to create a cadastro_funcionario.
     */
    data: XOR<cadastro_funcionarioCreateInput, cadastro_funcionarioUncheckedCreateInput>
  }

  /**
   * cadastro_funcionario createMany
   */
  export type cadastro_funcionarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cadastro_funcionarios.
     */
    data: cadastro_funcionarioCreateManyInput | cadastro_funcionarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cadastro_funcionario update
   */
  export type cadastro_funcionarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * The data needed to update a cadastro_funcionario.
     */
    data: XOR<cadastro_funcionarioUpdateInput, cadastro_funcionarioUncheckedUpdateInput>
    /**
     * Choose, which cadastro_funcionario to update.
     */
    where: cadastro_funcionarioWhereUniqueInput
  }

  /**
   * cadastro_funcionario updateMany
   */
  export type cadastro_funcionarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cadastro_funcionarios.
     */
    data: XOR<cadastro_funcionarioUpdateManyMutationInput, cadastro_funcionarioUncheckedUpdateManyInput>
    /**
     * Filter which cadastro_funcionarios to update
     */
    where?: cadastro_funcionarioWhereInput
    /**
     * Limit how many cadastro_funcionarios to update.
     */
    limit?: number
  }

  /**
   * cadastro_funcionario upsert
   */
  export type cadastro_funcionarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * The filter to search for the cadastro_funcionario to update in case it exists.
     */
    where: cadastro_funcionarioWhereUniqueInput
    /**
     * In case the cadastro_funcionario found by the `where` argument doesn't exist, create a new cadastro_funcionario with this data.
     */
    create: XOR<cadastro_funcionarioCreateInput, cadastro_funcionarioUncheckedCreateInput>
    /**
     * In case the cadastro_funcionario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cadastro_funcionarioUpdateInput, cadastro_funcionarioUncheckedUpdateInput>
  }

  /**
   * cadastro_funcionario delete
   */
  export type cadastro_funcionarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
    /**
     * Filter which cadastro_funcionario to delete.
     */
    where: cadastro_funcionarioWhereUniqueInput
  }

  /**
   * cadastro_funcionario deleteMany
   */
  export type cadastro_funcionarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cadastro_funcionarios to delete
     */
    where?: cadastro_funcionarioWhereInput
    /**
     * Limit how many cadastro_funcionarios to delete.
     */
    limit?: number
  }

  /**
   * cadastro_funcionario without action
   */
  export type cadastro_funcionarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cadastro_funcionario
     */
    select?: cadastro_funcionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cadastro_funcionario
     */
    omit?: cadastro_funcionarioOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Cadastro_funcionarioScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cpf: 'cpf',
    turno: 'turno',
    alojamento: 'alojamento'
  };

  export type Cadastro_funcionarioScalarFieldEnum = (typeof Cadastro_funcionarioScalarFieldEnum)[keyof typeof Cadastro_funcionarioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const cadastro_funcionarioOrderByRelevanceFieldEnum: {
    nome: 'nome',
    turno: 'turno',
    alojamento: 'alojamento'
  };

  export type cadastro_funcionarioOrderByRelevanceFieldEnum = (typeof cadastro_funcionarioOrderByRelevanceFieldEnum)[keyof typeof cadastro_funcionarioOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type cadastro_funcionarioWhereInput = {
    AND?: cadastro_funcionarioWhereInput | cadastro_funcionarioWhereInput[]
    OR?: cadastro_funcionarioWhereInput[]
    NOT?: cadastro_funcionarioWhereInput | cadastro_funcionarioWhereInput[]
    id?: IntFilter<"cadastro_funcionario"> | number
    nome?: StringFilter<"cadastro_funcionario"> | string
    cpf?: IntFilter<"cadastro_funcionario"> | number
    turno?: StringFilter<"cadastro_funcionario"> | string
    alojamento?: StringFilter<"cadastro_funcionario"> | string
  }

  export type cadastro_funcionarioOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    turno?: SortOrder
    alojamento?: SortOrder
    _relevance?: cadastro_funcionarioOrderByRelevanceInput
  }

  export type cadastro_funcionarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: cadastro_funcionarioWhereInput | cadastro_funcionarioWhereInput[]
    OR?: cadastro_funcionarioWhereInput[]
    NOT?: cadastro_funcionarioWhereInput | cadastro_funcionarioWhereInput[]
    nome?: StringFilter<"cadastro_funcionario"> | string
    cpf?: IntFilter<"cadastro_funcionario"> | number
    turno?: StringFilter<"cadastro_funcionario"> | string
    alojamento?: StringFilter<"cadastro_funcionario"> | string
  }, "id">

  export type cadastro_funcionarioOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    turno?: SortOrder
    alojamento?: SortOrder
    _count?: cadastro_funcionarioCountOrderByAggregateInput
    _avg?: cadastro_funcionarioAvgOrderByAggregateInput
    _max?: cadastro_funcionarioMaxOrderByAggregateInput
    _min?: cadastro_funcionarioMinOrderByAggregateInput
    _sum?: cadastro_funcionarioSumOrderByAggregateInput
  }

  export type cadastro_funcionarioScalarWhereWithAggregatesInput = {
    AND?: cadastro_funcionarioScalarWhereWithAggregatesInput | cadastro_funcionarioScalarWhereWithAggregatesInput[]
    OR?: cadastro_funcionarioScalarWhereWithAggregatesInput[]
    NOT?: cadastro_funcionarioScalarWhereWithAggregatesInput | cadastro_funcionarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"cadastro_funcionario"> | number
    nome?: StringWithAggregatesFilter<"cadastro_funcionario"> | string
    cpf?: IntWithAggregatesFilter<"cadastro_funcionario"> | number
    turno?: StringWithAggregatesFilter<"cadastro_funcionario"> | string
    alojamento?: StringWithAggregatesFilter<"cadastro_funcionario"> | string
  }

  export type cadastro_funcionarioCreateInput = {
    nome: string
    cpf: number
    turno: string
    alojamento: string
  }

  export type cadastro_funcionarioUncheckedCreateInput = {
    id?: number
    nome: string
    cpf: number
    turno: string
    alojamento: string
  }

  export type cadastro_funcionarioUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
    alojamento?: StringFieldUpdateOperationsInput | string
  }

  export type cadastro_funcionarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
    alojamento?: StringFieldUpdateOperationsInput | string
  }

  export type cadastro_funcionarioCreateManyInput = {
    id?: number
    nome: string
    cpf: number
    turno: string
    alojamento: string
  }

  export type cadastro_funcionarioUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
    alojamento?: StringFieldUpdateOperationsInput | string
  }

  export type cadastro_funcionarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
    alojamento?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type cadastro_funcionarioOrderByRelevanceInput = {
    fields: cadastro_funcionarioOrderByRelevanceFieldEnum | cadastro_funcionarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type cadastro_funcionarioCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    turno?: SortOrder
    alojamento?: SortOrder
  }

  export type cadastro_funcionarioAvgOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
  }

  export type cadastro_funcionarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    turno?: SortOrder
    alojamento?: SortOrder
  }

  export type cadastro_funcionarioMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    turno?: SortOrder
    alojamento?: SortOrder
  }

  export type cadastro_funcionarioSumOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}