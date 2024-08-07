package mk.ukim.finki.backend.config;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.config.filters.JWTAuthenticationFilter;
import mk.ukim.finki.backend.config.filters.JWTAuthorizationFilter;
import mk.ukim.finki.backend.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableMethodSecurity
public class JWTWebSecurityConfig{

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final UserService userService;

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.
                csrf(AbstractHttpConfigurer::disable)
                .cors(c->c.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests( (requests) -> requests
                        .requestMatchers("/", "/home", "/assets/**", "/api/login", "/api/products","/register")
                        .permitAll()
                        .anyRequest()
                        .authenticated()
                ).addFilter(new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager(), userService, passwordEncoder ))
                .addFilter(new JWTAuthorizationFilter(authenticationConfiguration.getAuthenticationManager()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}
