package com.isergeyam.battleship.repository;

import java.util.ArrayList;
import java.util.Collections;

import com.isergeyam.battleship.repository.StatsRepository;
import com.isergeyam.battleship.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import com.isergeyam.battleship.model.User;

/**
 * UserRepository
 */
public class StatsRepositoryImpl implements StatsRepository {
  @Autowired
  private UserRepository userRepository;

  @Override
  public ArrayList<String> findTop10Players() {
    ArrayList<String> result = new ArrayList<String>();
    Iterable<User> all_players = userRepository.findAll();
    for (User user : all_players) {
      result.add(user.getUsername());
    }
    Collections.sort(result);
    return new ArrayList<String>(result.subList(0, 10));
  }
}
