package com.isergeyam.battleship.service;

import java.util.ArrayList;

import org.springframework.data.util.Pair;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

/**
 * Ship
 */
@Getter
@Setter
public class Ship {
  @NonNull
  private ArrayList<Pair<Integer, Integer>> coords;
  @NonNull
  private String name;
  private long hitCount = 0;
  private boolean sunk = false;

  public Ship(ArrayList<ArrayList<Integer>> coords, String name) {
    this.coords = new ArrayList<>();
    this.name = name;
    for (ArrayList<?> coord : coords) {
      this.coords.add(Pair.of((Integer) coord.get(0), (Integer) coord.get(1)));
    }
  }

  public boolean Hit(Pair<Integer, Integer> coord) {
    for (Pair<Integer, Integer> shipCoord : coords) {
      if (shipCoord.equals(coord)) {
        ++hitCount;
        if (hitCount == coords.size()) {
          sunk = true;
        }
        return true;
      }
    }
    return false;
  }
}