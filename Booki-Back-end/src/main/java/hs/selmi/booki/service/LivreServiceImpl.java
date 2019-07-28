package hs.selmi.booki.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.repository.ILivresRepository;

@Service
public class LivreServiceImpl implements ILivreService {
	
	@Autowired
	ILivresRepository livreRepository;
	
	
	
	@Override
	public Set<Livre> getAllBooks() {
		return new HashSet<Livre>( this.livreRepository.findAll());
	}

	@Override
	public boolean saveBook(Livre livre) {
		if(this.livreRepository.save(livre)!=null) return true;
		else 
			return false;
	}



	@Override
	public Set<Livre> getBooksNameContain(String pattern) {
		return new HashSet<>(this.livreRepository.findByBookNameContain(pattern));
	}

	@Override
	public boolean deleteBook(Livre livre) {
		 this.livreRepository.delete(livre);
		 return true;
	}

	@Override
	public Optional<Livre>  findByIsbn(String isbn) {
		return this.livreRepository.findById(isbn);
	}

	@Override
	public Livre updateBook(Livre livre) {
		return this.livreRepository.save(livre);
	}

	@Override
	public Long countLivre() {
		return this.livreRepository.countLivre();
	}

	@Override
	public Long countUsers() {
		return this.livreRepository.countUsers();

	}

	@Override
	public Long countChallenges() {
		return this.livreRepository.countChallenges();

	}



	

}
