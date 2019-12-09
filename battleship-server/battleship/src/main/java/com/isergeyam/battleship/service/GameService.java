package com.isergeyam.battleship.service;

import java.util.Optional;

import com.isergeyam.battleship.controller.GameController;
import com.isergeyam.battleship.model.Game;
import com.isergeyam.battleship.service.PendingElement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * GameService
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Service
public class GameService {
  @Autowired
  private PendingElement<GamePlayer> userPendingGame;

  @Autowired
  protected GameController gameController;

  public void addPlayer(GamePlayer newPlayer) throws SamePlayerException {
    Optional<GamePlayer> opt_player = userPendingGame.GetOrSet(newPlayer);
    if (opt_player.isPresent()) {
      GamePlayer player = opt_player.get();
      player.setEnemyPlayer(newPlayer);
      newPlayer.setEnemyPlayer(player);
      player.setGameController(gameController);
      newPlayer.setGameController(gameController);
      // GameSession session = new GameSession(player, newPlayer, new Board(), new Board());
      player.NotifyStart();
      newPlayer.NotifyWait();
    }
  }
}