package com.isergeyam.battleship.repository;

import java.util.Optional;

import com.isergeyam.battleship.model.User;

import org.springframework.data.repository.CrudRepository;

/**
 * UserRepository
 */
public interface UserRepository extends CrudRepository<User, Integer> {
  Optional<User> findByEmail(String email);

  Optional<User> findByUsernameOrEmail(String username, String email);

  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}