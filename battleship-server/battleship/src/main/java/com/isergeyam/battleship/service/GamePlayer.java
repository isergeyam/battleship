package com.isergeyam.battleship.service;

import com.isergeyam.battleship.controller.GameController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;

import lombok.Getter;
import lombok.Setter;

/**
 * GamePlayer
 */
@Getter
@Setter
public abstract class GamePlayer {
  public abstract void TakeTurn(Pair<Integer, Integer> turn);

  public abstract void NotifyStart();

  public abstract void NotifyWait();

  public abstract void WaitTurn();

  public abstract void NotifyTurn(HitResult result);

  protected Board board;
  protected GamePlayer enemyPlayer;

  protected GameController gameController;
}