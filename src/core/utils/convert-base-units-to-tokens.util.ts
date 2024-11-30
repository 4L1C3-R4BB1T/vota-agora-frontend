export function convertBaseUnitsToTokens(baseUnits: string, decimals = 18) {
    const valueInBaseUnits = BigInt(baseUnits);
    const factor = BigInt(10) ** BigInt(decimals);
    const valueInTokens = valueInBaseUnits / factor;
    return valueInTokens.toString(); 
}
  
  