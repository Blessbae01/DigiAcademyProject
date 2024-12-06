package com.example.bankingapp.controller;

import com.example.bankingapp.model.User;
import com.example.bankingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    // Registration page
    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";
    }

    // Registration handler
    @PostMapping("/register")
    public String registerUser(User user) {
        userService.saveUser(user);
        return "redirect:/login";
    }

    // Login page
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    // Dashboard page after login
    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        
        model.addAttribute("user", new User()); 
        return "dashboard";
    }
}
