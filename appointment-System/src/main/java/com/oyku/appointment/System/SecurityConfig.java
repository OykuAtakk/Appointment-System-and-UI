package com.oyku.appointment.System;
/*
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //.csrf().disable()  // CSRF korumasını devre dışı bırakır (genellikle REST API'ler için kullanılır)
                .authorizeRequests()
                .requestMatchers("http://localhost:8080/patient").permitAll()  // Bu endpoint'lere kimlik doğrulaması gerekmez
                .anyRequest().authenticated();  // Diğer tüm istekler kimlik doğrulama gerektirir

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

     Kullanıcı doğrulaması için UserDetailsService veya AuthenticationManager'ı burada tanımlayabilirsiniz
    @Bean
    public UserDetailsService userDetailsService() {
        // UserDetailsService bean tanımı burada yapılabilir
        return null; // Buraya kullanıcı ayrıntıları servisini ekleyin
    }
}
*/

