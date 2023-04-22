/**
 * Utility method to add commas every three intervals from right.
 *
 * @param value value to convert.
 * @returns number with commas.
 */
export const numberWithCommas = (value: number | string): string => {
    const x = value?.toString() ?? "0";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  