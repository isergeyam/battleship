package com.isergeyam.battleship.repository;

import java.util.Optional;
import java.util.Set;
import java.util.ArrayList;

import com.isergeyam.battleship.model.Game;
import com.isergeyam.battleship.model.User;

import org.springframework.data.repository.CrudRepository;

/**
 * UserRepository
 */
public interface GameRepository extends CrudRepository<Game, Integer> {
  Set<Game> findByWinner(User winner);

  Set<Game> findByLooser(User looser);

  Optional<Game> findById(Integer id);
}
