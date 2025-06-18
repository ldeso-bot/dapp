import 'zod';
import type {
  RawCreateParams,
  RefinementCtx,
  ZodEffects,
  ZodTypeAny,
} from 'zod';

declare module 'zod' {
  namespace z {
    function preprocess<Schema extends ZodTypeAny>(
      preprocess: (arg: unknown, ctx: RefinementCtx) => unknown,
      schema: Schema,
      params?: RawCreateParams
    ): ZodEffects<Schema, Schema['_output'], Schema['_input']>; // It was ZodEffects<Schema, Schema["_output"], unknown>
  }
}
