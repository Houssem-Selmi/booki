package hs.selmi.booki.service;

import java.util.Set;
import java.util.Optional;

import hs.selmi.booki.domain.Livre;

public interface ILivreService {

	
	Set<Livre> getAllBooks();
	Set<Livre> getBooksNameContain(String pattern);	
	boolean saveBook(Livre livre);
	boolean deleteBook(Livre livre);
	Optional<Livre>  findByIsbn(String isbn);
	Livre updateBook(Livre livre);
	Long countLivre();
	Long countUsers();
	Long countChallenges();


}
