package com.isergeyam.battleship.repository;

import java.util.ArrayList;

/**
 * UserRepository
 */
public interface StatsRepository {
  ArrayList<String> findTop10Players();
}