package com.isergeyam.battleship.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.NaturalId;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.isergeyam.battleship.model.Game;

/**
 * User
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer Id;

  @NaturalId
  @NotBlank
  private String username;

  @NaturalId
  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String password;

  private Long gamesPlayed;

  private Long gamesWon;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "Id")
  private Set<Game> accounts;

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public Long GetWinRate() {
    return this.gamesWon * 100 / this.gamesPlayed;
  }
}