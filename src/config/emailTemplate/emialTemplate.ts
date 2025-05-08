export const getEmailTemplateForOtp = (otp: string): string => `
    <!DOCTYPE html>
    <html lang="en-us">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />  
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
            :root {
                --ud-blue: #00539F;
                --ud-gold: #FFD200;
            }
        </style>
    </head>
    <body style="margin:0;font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
            <tr>
                <td style="padding:50px 20px;background:#00539F;">
                    <table role="presentation" style="width:100%;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:40px;">
                        <!-- Header -->
                        <tr>
                            <td style="text-align:center;padding-bottom:30px;background:#00539f; padding:15px 0px 15px 0px;">
                                <img src="https://www.udel.edu/content/dam/udelImages/main/graphics/udelLogoImages/logo-udel.png" 
                                     alt="University of Delaware Logo" 
                                     style="width:200px;height:auto;margin-bottom:20px;">
                                <h1 style="margin:0;font-size:24px;font-weight:600;">
                                    <span style="color:#FFD200">Food Waste Tracker</span>
                                </h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding:20px 0;">
                                <p style="margin:0 0 15px;color:#333;">
                                    Welcome to the University of Delaware's Food Waste Tracking System. 
                                    Please use this verification code to complete your registration:
                                </p>
                                
                                <!-- OTP Box -->
                                <div style="background:#00539F;border-radius:8px;padding:20px;text-align:center;margin:25px 0;">
                                    <span style="font-size:32px;font-weight:600;color:#fff;letter-spacing:5px;">
                                        ${otp}
                                    </span>
                                </div>
                                
                                <p style="margin:15px 0 0;color:#666;font-size:13px;">
                                    This code will expire in 2 minutes. If you didn't request this code, please ignore this email.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding-top:30px;border-top:1px solid #e2e8f0;">
                                <p style="margin:0;color:#00539F;font-weight:500;">
                                    Food Waste Management Team<br>
                                    University of Delaware
                                </p>
                                <p style="margin:20px 0 0;color:#666;font-size:12px;text-align:center;">
                                    © ${new Date().getFullYear()} University of Delaware<br>
                                    Newark, DE 19716
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
`;
