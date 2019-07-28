package hs.selmi.booki.rest;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.service.ILivreService;


@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("livres")
public class LivreRestController {

	@Autowired 
	ILivreService livreService;
    
	@GetMapping
	public Set<Livre> getAllBooks(){
		return this.livreService.getAllBooks();
	}
	
	@GetMapping(path="/countBooks")
	public Long countBooks(){
		return this.livreService.countLivre();
	}
	

	@GetMapping(path="/countUsers")
	public Long countUsers(){
		return this.livreService.countUsers();
	}
	

	@GetMapping(path="/countChallenges")
	public Long countChallenges(){
		return this.livreService.countChallenges();
	}
	
	
	@PostMapping(path="/create")
	public ResponseEntity<Livre> create(@RequestBody Livre livre){
		try {
			this.livreService.saveBook(livre);
			return new ResponseEntity<Livre>(livre, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);
		}

	}
	

	@PostMapping(path="/update")
	public ResponseEntity<Livre> update(@RequestBody Livre livre){
		try {
			this.livreService.saveBook(livre);
			return new ResponseEntity<Livre>(livre, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);
		}

	}
	
	
	
	@GetMapping(path = "/{isbn}")
	public ResponseEntity<Livre> findById(@PathVariable("isbn") String isbn) {
		Optional<Livre> resultat = livreService.findByIsbn(isbn);
		if (resultat.isPresent())
			return new ResponseEntity<>(resultat.get(), HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	
	@DeleteMapping(path = "/{isbn}")
	public ResponseEntity<Livre> delete(@PathVariable("isbn") String isbn){
		Optional<Livre> resultat = livreService.findByIsbn(isbn);
			if(resultat.isPresent()) {
				this.livreService.deleteBook(resultat.get());
				return new ResponseEntity<>(HttpStatus.ACCEPTED);
			}
			else
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}

	
	
}
