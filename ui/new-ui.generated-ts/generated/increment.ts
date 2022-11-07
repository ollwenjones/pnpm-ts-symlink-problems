// in practice these are generated, and not under version control

import { IIncrementArg } from "@sj-test/server-api/IIncrementArg";
import { IIncrementResult } from "@sj-test/server-api/IIncrementResult";

export function increment({in: input, by}: IIncrementArg): IIncrementResult {
    return {out: (input + (by || 1))};
}