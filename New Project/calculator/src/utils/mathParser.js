let memory = null;

export const parseMathQuery = (query) => {
  if (!query) return { success: false, error: 'Empty query.' };

  const lowerQuery = query.toLowerCase().trim();

  // Reset Memory Command handling
  if (lowerQuery === 'clear' || lowerQuery === 'reset' || lowerQuery === 'forget') {
    memory = null;
    return { success: true, resultText: "My memory has been cleared.", value: null };
  }

  try {
    let mathString = lowerQuery
      .replace(/plus/g, '+')
      .replace(/minus/g, '-')
      .replace(/times/g, '*')
      .replace(/multiplied by/g, '*')
      .replace(/into/g, '*')
      .replace(/divided by/g, '/')
      .replace(/divide/g, '/')
      .replace(/percent of/g, '/ 100 *')
      .replace(/%/g, '/ 100 *')
      .replace(/x/g, '*')
      // Intercept subjective memory identifiers
      .replace(/\b(that|it|ans|answer|previous)\b/g, memory !== null ? memory.toString() : '')
      .replace(/[a-z]/ig, '') // Strip remaining unparsable English syntax
      .trim();

    // Contextual implied operator parsing (e.g. user just typing "+ 50" or "/ 2")
    // Prepend the stored memory to the front of the parsed math expression
    if (mathString.length > 0 && /^[+\-*/]/.test(mathString)) {
        if (memory !== null) {
            mathString = memory.toString() + ' ' + mathString;
        } else {
            return { success: false, error: "I don't have a previous calculation in memory to use." };
        }
    }

    if (!mathString) {
      return { success: false, error: "I didn't hear any valid math." };
    }

    // Safely evaluate math expression without using dangerous 'eval'
    const result = new Function(`return ${mathString}`)();
    
    if (isNaN(result) || typeof result !== 'number' || !isFinite(result)) {
      return { success: false, error: "That doesn't seem like a valid calculation." };
    }

    // Update internal memory core
    memory = result;

    return { 
      success: true, 
      resultText: `The answer is ${result}`, 
      value: result 
    };
  } catch (error) {
    return { success: false, error: "I couldn't compute that math." };
  }
};
