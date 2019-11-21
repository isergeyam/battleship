package com.isergeyam.battleship.payload;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * StatsResponse
 */
@AllArgsConstructor
@NoArgsConstructor
public class StatsResponse {
  private Long gamesPlayed;
  private Long gamesWon;
}