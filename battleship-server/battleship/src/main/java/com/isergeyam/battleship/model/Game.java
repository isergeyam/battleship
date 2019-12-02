package com.isergeyam.battleship.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.isergeyam.battleship.model.User;

/**
 * Game
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
public class Game {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer Id;

  @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="winner_id")
  @NotBlank
  private User winner;

  @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="looser_id")
  @NotBlank
  private User looser;

}