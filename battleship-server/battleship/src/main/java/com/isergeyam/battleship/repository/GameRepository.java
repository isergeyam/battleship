package com.isergeyam.battleship.repository;

import java.util.Optional;

import com.isergeyam.battleship.model.Game;
import com.isergeyam.battleship.model.User;

import org.springframework.data.repository.CrudRepository;

/**
 * UserRepository
 */
public interface GameRepository extends CrudRepository<Game, Integer> {
  Optional<Game> findByWinner(User winner);

  Optional<Game> findByLooser(User looser);

  Optional<Game> findById(Integer id);
}