let memory = null;

export const parseMathQuery = (query, language = 'en-US', userName = '') => {
  if (!query) return { success: false, error: 'Empty query.' };

  const lowerQuery = query.toLowerCase().trim();
  const nameTag = userName.trim() ? `, ${userName}` : '';

  // Language Dictionary
  const langLib = {
    clear: language === 'hi-IN' ? `Mera memory clear ho gaya hai${nameTag}.` : `My memory has been cleared${nameTag}.`,
    noMemory: language === 'hi-IN' ? `Mere memory me pichla calculation nahi hai${nameTag}.` : `I don't have a previous calculation in memory to use${nameTag}.`,
    errorMath: language === 'hi-IN' ? `Ye badhiya calculation nahi lag raha hai${nameTag}.` : `That doesn't seem like a valid calculation${nameTag}.`,
    errorCompute: language === 'hi-IN' ? `Mai isko compute nahi kar paya${nameTag}.` : `I couldn't compute that math${nameTag}.`
  };

  // Reset Memory Command handling
  if (lowerQuery === 'clear' || lowerQuery === 'reset' || lowerQuery === 'forget') {
    memory = null;
    return { success: true, resultText: langLib.clear, value: null };
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

    // Contextual implied operator parsing
    if (mathString.length > 0 && /^[+\-*/]/.test(mathString)) {
        if (memory !== null) {
            mathString = memory.toString() + ' ' + mathString;
        } else {
            return { success: false, error: langLib.noMemory };
        }
    }

    if (!mathString) {
      return { success: false, error: langLib.errorMath };
    }

    const result = new Function(`return ${mathString}`)();
    
    if (isNaN(result) || typeof result !== 'number' || !isFinite(result)) {
      return { success: false, error: langLib.errorMath };
    }

    memory = result;

    const resultText = language === 'hi-IN' 
        ? `Is ka jawab hai ${result}${nameTag}` 
        : `The answer is ${result}${nameTag}`;

    return { 
      success: true, 
      resultText: resultText,
      value: result 
    };
  } catch (error) {
    return { success: false, error: langLib.errorCompute };
  }
};
