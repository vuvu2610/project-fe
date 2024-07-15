package matcha.banking.be.service;

import matcha.banking.be.dao.UserDao;
import matcha.banking.be.dto.EmailDetails;
import matcha.banking.be.entity.UserEntity;
import matcha.banking.be.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDao userDao;

    public void processForgotPassword(String email) {
        UserEntity user = userDao.findByEmail(email).orElse(null);
        if (user != null) {
            String token = jwtUtil.generateToken(user);
            String resetLink = "http://localhost:3000/reset-password?token=" + token;
            String subject = "Reset your password";
            String body = "To reset your password, click the link below:\n" + resetLink;
            EmailDetails emailDetails = EmailDetails.builder()
                    .recipient(email)
                    .subject(subject)
                    .msgBody(body)
                    .build();
            emailService.sendSimpleMail(emailDetails);
        }
    }
}

