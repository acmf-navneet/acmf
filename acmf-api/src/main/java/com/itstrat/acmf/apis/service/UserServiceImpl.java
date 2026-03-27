package com.itstrat.acmf.apis.service;

import com.itstrat.acmf.apis.config.JwtGenerator;
import com.itstrat.acmf.apis.entity.User;
import com.itstrat.acmf.apis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl  implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email = JwtGenerator.getEmailFromJwtToken(jwt);

        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        if (email == null || email.isBlank()) {
            throw new Exception("User not found");
        }
        String trimmed = email.trim();
        User user = userRepository.findByEmail(trimmed);
        if (user == null) {
            user = userRepository.findByEmailIgnoreCase(trimmed);
        }
        if (user == null) {
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User findUserById(Long Id) throws Exception {
        Optional<User> optionalUser = userRepository.findById(Id);
        if(optionalUser.isEmpty())
        {
            throw new Exception("user not found");
        }
        return optionalUser.get();
    }

}
