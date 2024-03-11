export function combineArrays(...arrays: Array<string[] | null | undefined>): string[] {
  return arrays.reduce((acc, val) => {
    if (Array.isArray(val) && Array.isArray(acc)) {
      return acc.concat(val);
    }
    return acc;
  }, []) as string[];
}