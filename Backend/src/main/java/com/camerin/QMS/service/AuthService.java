package com.camerin.QMS.service;

import com.camerin.QMS.dto.LoginDto;
import com.camerin.QMS.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    String login(LoginDto loginDto);
}
