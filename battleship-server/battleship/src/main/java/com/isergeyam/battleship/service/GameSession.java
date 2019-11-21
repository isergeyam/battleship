package com.isergeyam.battleship.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * GameSession
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GameSession {
  GamePlayer firstPlayer;
  GamePlayer secondPlayer;
  Board firstBoard;
  Board secondBoard;

  public Board GetEnemyBoard(GamePlayer player) {
    if (player == firstPlayer) {
      return secondBoard;
    }
    return firstBoard;
  }
}