package com.isergeyam.battleship.payload;

import com.isergeyam.battleship.service.Board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * StartGameRequest
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StartGameRequest {
  private String token;
  private boolean playWithAI;
  private Board board;
}