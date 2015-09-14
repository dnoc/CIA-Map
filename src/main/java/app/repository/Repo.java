package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.*;

public interface Repo extends JpaRepository<Item, Integer> {
	
}