package com.isergeyam.battleship.controller;

import java.util.Hashtable;
import java.util.concurrent.ForkJoinPool;

import javax.validation.Valid;

import com.isergeyam.battleship.model.User;
import com.isergeyam.battleship.payload.StartGameRequest;
import com.isergeyam.battleship.payload.TokenRequest;
import com.isergeyam.battleship.payload.TurnRequest;
import com.isergeyam.battleship.service.Board;
import com.isergeyam.battleship.service.GamePlayer;
import com.isergeyam.battleship.service.GameService;
import com.isergeyam.battleship.service.UserGamePlayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

/**
 * GameController
 */
@RestController
@CrossOrigin
@RequestMapping("/api/game")
public class GameController {
  @Autowired
  private Hashtable<String, User> currentlyLoggedUser;

  @Autowired
  private Hashtable<String, GamePlayer> gamePlayers;

  @Autowired
  private GameService gameService;

  @PostMapping("/start")
  public DeferredResult<ResponseEntity<?>> startGame(@Valid @RequestBody StartGameRequest startGameRequest) {
    String token = startGameRequest.getToken();
    DeferredResult<ResponseEntity<?>> output = new DeferredResult<>(Long.valueOf(100500));
    if (!currentlyLoggedUser.containsKey(token)) {
      output.setResult(
          new ResponseEntity<>(new ApiResponse<>(false, "Unathorized", "Unathorized"), HttpStatus.UNAUTHORIZED));
      return output;
    }
    Board board = new Board(startGameRequest.getShips());
    User user = currentlyLoggedUser.get(token);
    GamePlayer player = new UserGamePlayer(user, token, output, board);
    gamePlayers.put(token, player);
    gameService.addPlayer(player);
    return output;
  }

  @PostMapping("/wait")
  public DeferredResult<ResponseEntity<?>> waitForTurn(@Valid @RequestBody TokenRequest tokenRequest) {
    String token = tokenRequest.getToken().replaceAll("^\"|\"$", "");
    DeferredResult<ResponseEntity<?>> output = new DeferredResult<>(Long.valueOf(100500));
    if (!currentlyLoggedUser.containsKey(token)) {
      output.setResult(
          new ResponseEntity<>(new ApiResponse<>(false, "Unathorized", "Unathorized"), HttpStatus.UNAUTHORIZED));
      return output;
    }
    if (!gamePlayers.containsKey(token)) {
      output.setResult(
          new ResponseEntity<>(new ApiResponse<>(false, "This user has not started game", ""), HttpStatus.BAD_REQUEST));
      return output;
    }
    UserGamePlayer player = (UserGamePlayer) gamePlayers.get(token);
    player.setOutput(output);
    ForkJoinPool.commonPool().submit(() -> {
      player.WaitTurn();
    });
    return output;
  }

  @PostMapping("/turn")
  public DeferredResult<ResponseEntity<?>> makeTurn(@Valid @RequestBody TurnRequest turnRequest) {
    String token = turnRequest.getToken();
    DeferredResult<ResponseEntity<?>> output = new DeferredResult<>(Long.valueOf(100500));
    if (!currentlyLoggedUser.containsKey(token)) {
      output.setResult(
          new ResponseEntity<>(new ApiResponse<>(false, "Unathorized", "Unathorized"), HttpStatus.UNAUTHORIZED));
      return output;
    }
    if (!gamePlayers.containsKey(token)) {
      output.setResult(
          new ResponseEntity<>(new ApiResponse<>(false, "This user has not started game", ""), HttpStatus.BAD_REQUEST));
      return output;
    }
    UserGamePlayer player = (UserGamePlayer) gamePlayers.get(token);
    player.setOutput(output);
    player.TakeTurn(turnRequest.getTurn());
    return output;
  }
}