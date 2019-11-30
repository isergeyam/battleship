package com.isergeyam.battleship.payload;

import org.springframework.data.util.Pair;

import lombok.Getter;
import lombok.Setter;

/**
 * TurnRequest
 */
@Getter
@Setter
public class TurnRequest {
  private String token;
  private Pair<Integer, Integer> turn;
  public TurnRequest(String token, Integer turn_x, Integer turn_y) {
    this.token = token;
    this.turn = Pair.of(turn_x, turn_y);
  }
}
