export const parseMathQuery = (query) => {
  if (!query) return { success: false, error: 'Empty query.' };

  try {
    let mathString = query.toLowerCase()
      .replace(/plus/g, '+')
      .replace(/minus/g, '-')
      .replace(/times/g, '*')
      .replace(/multiplied by/g, '*')
      .replace(/divided by/g, '/')
      .replace(/divide/g, '/')
      .replace(/percent of/g, '/ 100 *')
      .replace(/%/g, '/ 100 *')
      .replace(/x/g, '*')
      .replace(/[a-z]/ig, '') // remove remaining text
      .trim();

    if (!mathString) {
      return { success: false, error: "I didn't hear any numbers." };
    }

    // safely evaluate
    const result = new Function(`return ${mathString}`)();
    
    if (isNaN(result) || typeof result !== 'number' || !isFinite(result)) {
      return { success: false, error: "That doesn't seem like a valid calculation." };
    }

    return { 
      success: true, 
      resultText: `The answer is ${result}`, 
      value: result 
    };
  } catch (error) {
    return { success: false, error: "I couldn't compute that math." };
  }
};
