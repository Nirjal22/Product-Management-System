package org.productmanagementsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF in the new builder style
                .cors(cors -> {
                })             // Enable CORS handling
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/products/**").permitAll() // Public access
                        .anyRequest().authenticated()               // Other endpoints need auth
                );

        return http.build();
    }
}
