package com.isergeyam.battleship.service;

import java.util.Optional;

import com.isergeyam.battleship.controller.ApiResponse;
import com.isergeyam.battleship.model.User;

import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.async.DeferredResult;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * UserGamePlayer
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserGamePlayer extends GamePlayer {
  private User user;
  private String token;
  private Optional<HitResult> opt_result;
  DeferredResult<ResponseEntity<?>> output;

  public UserGamePlayer(User user, String token, DeferredResult<ResponseEntity<?>> output, Board board) {
    this.user = user;
    this.token = token;
    this.output = output;
    this.board = board;
    this.opt_result = Optional.empty();
  }

  @Override
  public void NotifyStart() {
    output.setResult(ResponseEntity.ok(new ApiResponse<String>(true, "start", "start")));
  }

  @Override
  public void NotifyWait() {
    output.setResult(ResponseEntity.ok(new ApiResponse<String>(true, "wait", "wait")));
  }

  @Override
  public void NotifyTurn(HitResult result) {
    this.opt_result = Optional.of(result);
    notify();
  }

  @Override
  public void TakeTurn(Pair<Integer, Integer> turn) {
    HitResult result = enemyPlayer.getBoard().Hit(turn);
    enemyPlayer.NotifyTurn(result);
    output.setResult(ResponseEntity.ok(new ApiResponse<HitResult>(true, "hit result", result)));
  }

  @Override
  public void WaitTurn() {
    while (!this.opt_result.isPresent()) {
      try {
        wait();
      } catch (InterruptedException e) {
      }
    }
    HitResult result = opt_result.get();
    output.setResult(ResponseEntity.ok(new ApiResponse<HitResult>(true, "hit result", result)));
  }
}