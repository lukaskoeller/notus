package com.notus.notus;

import org.springframework.data.repository.CrudRepository;

import com.notus.notus.Note;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface NoteRepository extends CrudRepository<User, Integer> {

}
