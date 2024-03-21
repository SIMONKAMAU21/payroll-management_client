function generateMotivationCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 6;
    let motivationCode = '';
  
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      motivationCode += characters[randomIndex];
    }
  
    return motivationCode;
  }
  
  const motivationCode = generateMotivationCode();
  console.log('Motivation Code:', motivationCode);
  