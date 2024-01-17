package com.camerin.QMS.service;

import com.camerin.QMS.dto.LoginDto;
import com.camerin.QMS.dto.RegisterDto;
import com.camerin.QMS.dto.RoleDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    RoleDto login(LoginDto loginDto);
}
