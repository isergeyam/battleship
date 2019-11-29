package com.isergeyam.battleship.service;

import java.util.ArrayList;

import org.springframework.data.util.Pair;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Board
 */
@Getter
@Setter
public class Board {
  private ArrayList<Ship> ships;
  private int ships_sunk = 0;

  public Board(ArrayList<Ship> ships) {
    this.ships = ships;
  }

  public HitResult Hit(Pair<Integer, Integer> coord) {
    for (Ship ship : ships) {
      if (ship.Hit(coord)) {
        if (ship.isSunk()) {
          ++ships_sunk;
        }
        return new HitResult(true, ship.isSunk(), coord);
      }
    }
    return new HitResult(false, false, coord);
  }

  public boolean AllSunk() {
    return ships_sunk == ships.size();
  }
}