import { RenderResult } from "@testing-library/react";

export abstract class BaseDriver {
  protected wrapper?: RenderResult;

  withWrapper(fn: (wrapper: RenderResult) => any) {
    if (!this.wrapper) {
      throw new Error("Component must be rendered before accessed!");
    }

    return fn(this.wrapper);
  }
}
