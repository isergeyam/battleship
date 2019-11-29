package com.isergeyam.battleship.payload;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * StatsResponse
 */
@AllArgsConstructor
@NoArgsConstructor
public class Top10PlayerResponse {
  private ArrayList<String> top_players_usernames; 
}