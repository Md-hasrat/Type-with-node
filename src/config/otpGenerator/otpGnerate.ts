export const generateOtp = (length: number = 6): string => {
    // Input validation
    if (length < 1 || length > 10) {
      throw new Error("OTP length must be between 1 and 10 digits");
    }
  
    // Generate random number of specified length
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return otp.toString();
  };
  
  // Alternative implementation using Array method
  export const generateOtpAlt = (length: number = 6): string => {
    if (length < 1 || length > 10) {
      throw new Error("OTP length must be between 1 and 10 digits");
    }
  
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  };
  