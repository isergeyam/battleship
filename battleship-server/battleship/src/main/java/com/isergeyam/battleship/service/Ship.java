package com.isergeyam.battleship.service;

import org.springframework.data.util.Pair;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Ship
 */
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Ship {
  @NonNull
  private Pair<Integer, Integer>[] coords;
  @NonNull
  private String name;
  private long hitCount = 0;
  private boolean sunk = false;

  public boolean Hit(Pair<Integer, Integer> coord) {
    for (Pair<Integer, Integer> shipCoord : coords) {
      if (shipCoord.equals(coord)) {
        ++hitCount;
        if (hitCount == coords.length) {
          sunk = true;
        }
        return true;
      }
    }
    return false;
  }
}