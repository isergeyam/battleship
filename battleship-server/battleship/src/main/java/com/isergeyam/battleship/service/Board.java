package com.isergeyam.battleship.service;

import org.springframework.data.util.Pair;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Board
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Board {
  private Ship[] ships;

  public HitResult Hit(Pair<Integer, Integer> coord) {
    for (Ship ship : ships) {
      if (ship.Hit(coord)) {
        return new HitResult(true, ship.isSunk(), coord);
      }
    }
    return new HitResult(false, false, coord);
  }
}