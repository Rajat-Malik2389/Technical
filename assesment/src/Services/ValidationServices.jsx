export const ValidationService = {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  
    validatePassword(password) {
      return password.length >= 6;
    },
  
    validateName(name) {
      return name.trim().length >= 2;
    },
  
    getEmailError(email) {
      if (!email) return "Email is required";
      if (!ValidationService.validateEmail(email))
        return "Please enter a valid email";
      return "";
    },
  
    getPasswordError(password) {
      if (!password) return "Password is required";
      if (!ValidationService.validatePassword(password))
        return "Password must be at least 6 characters";
      return "";
    },
  
    getNameError(name) {
      if (!name) return "Name is required";
      if (!ValidationService.validateName(name))
        return "Name must be at least 2 characters";
      return "";
    },
  };
  