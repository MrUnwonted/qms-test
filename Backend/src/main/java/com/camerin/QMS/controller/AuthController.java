package com.camerin.QMS.controller;

import com.camerin.QMS.dto.LoginDto;
import com.camerin.QMS.dto.RegisterDto;
import com.camerin.QMS.dto.RoleDto;
import com.camerin.QMS.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    // Build Register REST API
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Build Login REST API
    @PostMapping("/login")
    public ResponseEntity<RoleDto> login(@RequestBody LoginDto loginDto){
        RoleDto response = authService.login(loginDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
