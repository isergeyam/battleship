package com.isergeyam.battleship.config;

import java.util.Hashtable;

import com.isergeyam.battleship.model.User;
import com.isergeyam.battleship.service.GamePlayer;
import com.isergeyam.battleship.service.GameService;
import com.isergeyam.battleship.service.PendingElement;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * SecurityConfig
 */
@Configuration
@SpringBootApplication(exclude = {
    org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
    org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class })
public class SecurityConfig {
  @Bean
  public PasswordEncoder passwordEncoder() {
    PasswordEncoder encoder = new BCryptPasswordEncoder();
    return encoder;
  }

  @Bean
  public Hashtable<String, User> currentlyLoggedUser() {
    Hashtable<String, User> loggedUser = new Hashtable<String, User>();
    return loggedUser;
  }

  @Bean
  public PendingElement<User> userPendingGame() {
    PendingElement<User> user = new PendingElement<>();
    return user;
  }

  @Bean
  public Hashtable<String, GamePlayer> gameSessions() {
    Hashtable<String, GamePlayer> gameSessions = new Hashtable<String, GamePlayer>();
    return gameSessions;
  }

  @Bean
  public GameService gameService() {
    GameService gameService = new GameService();
    return gameService;
  }
}
