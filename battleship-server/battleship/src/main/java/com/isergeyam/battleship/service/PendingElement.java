package com.isergeyam.battleship.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;

/**
 * PendingElement
 */
@NoArgsConstructor
@Service
public class PendingElement<T> {
  Optional<T> value = Optional.empty();

  public synchronized Optional<T> GetOrSet(T element) {
    if (value.isPresent()) {
      T real_value = value.get();
      value = Optional.empty();
      return Optional.of(real_value);
    }
    value = Optional.of(element);
    return Optional.empty();
  }
}