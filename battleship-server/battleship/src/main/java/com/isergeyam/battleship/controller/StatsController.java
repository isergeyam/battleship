package com.isergeyam.battleship.controller;

import java.util.HashMap;
import java.util.Hashtable;

import javax.validation.Valid;

import com.isergeyam.battleship.model.User;
import com.isergeyam.battleship.payload.StatsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * StatsController
 */
@RestController()
@CrossOrigin
@RequestMapping("/api")
public class StatsController {
  @Autowired
  private Hashtable<String, User> currentlyLoggedUser;

  @PostMapping("/stats")
  public ResponseEntity<?> getUserStats(@Valid @RequestBody String token) {
    if (!currentlyLoggedUser.containsKey(token)) {
      return new ResponseEntity<>(new ApiResponse<>(false, "Unathorized", new StatsResponse()),
          HttpStatus.UNAUTHORIZED);
    }
    User user = currentlyLoggedUser.get(token);
    return ResponseEntity
        .ok(new ApiResponse<>(true, "Stats", new StatsResponse(user.getGamesPlayed(), user.getGamesWon())));
  }

}