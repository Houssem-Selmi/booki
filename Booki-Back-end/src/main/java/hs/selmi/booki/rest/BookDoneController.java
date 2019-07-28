package hs.selmi.booki.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.domain.UtiliLivreDone;
import hs.selmi.booki.domain.Utilisateur;
import hs.selmi.booki.service.IBooksDoneService;
import hs.selmi.booki.service.ILivreService;
import hs.selmi.booki.service.IUtilisateurService;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("booksdone")
public class BookDoneController {

	@Autowired
	IBooksDoneService iBooksDoneService;
	
	@Autowired 
	IUtilisateurService utilisateurService;
	@Autowired
	ILivreService livreService;

	
	@PostMapping(path="/addBookDoneToUser")
	public ResponseEntity<Livre> addBookDoneToUser(@RequestBody ObjectNode json){
		Utilisateur user = new Utilisateur();
		Livre bookToAdd = new Livre();
		try {
			user = new ObjectMapper().treeToValue(json.get("user"), Utilisateur.class);
			bookToAdd = new ObjectMapper().treeToValue(json.get("livre"), Livre.class);
			int rate = new ObjectMapper().treeToValue(json.get("rate"), Integer.class);

			boolean test = this.iBooksDoneService.addBookDoneToUser(bookToAdd,user,rate);
			if(test)
			return new ResponseEntity<Livre>(bookToAdd,HttpStatus.OK);

		} catch (JsonProcessingException e) {
			System.out.println("Parsing Exception!!");
			e.printStackTrace();
			return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);

		}
		return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);

	}
	
	
	@PostMapping(path="/deleteDoneBookFromUser")
	public ResponseEntity<Boolean> deleteBookFromUser(@RequestBody ObjectNode json){
		Utilisateur user = new Utilisateur();
		Livre bookToRemove = new Livre();
			String isbn = json.get("isbn").asText();
			String email = json.get("email").asText();
			user = this.utilisateurService.findByEmail(email).get();
			bookToRemove = this.livreService.findByIsbn(isbn).get();
			boolean done = this.iBooksDoneService.removeBookDoneFromUser(bookToRemove, user);
		return new ResponseEntity<Boolean>(done,HttpStatus.OK);

	}
	
	
	@PostMapping(path="/updateBookDoneRate")
	public ResponseEntity<Livre> updateBookDoneRate(@RequestBody ObjectNode json){
		Utilisateur user = new Utilisateur();
		Livre bookToAdd = new Livre();
		try {
			user = new ObjectMapper().treeToValue(json.get("user"), Utilisateur.class);
			bookToAdd = new ObjectMapper().treeToValue(json.get("livre"), Livre.class);
			int rate = new ObjectMapper().treeToValue(json.get("rate"), Integer.class);
			boolean test = this.iBooksDoneService.addBookDoneToUser(bookToAdd,user,rate);
			if(test)
			return new ResponseEntity<Livre>(bookToAdd,HttpStatus.OK);

		} catch (JsonProcessingException e) {
			System.out.println("Parsing Exception!!");
			e.printStackTrace();
			return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);

		}
		return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);

	}
	
	
	@GetMapping
	public ResponseEntity<List<UtiliLivreDone>> getAllUserDoneBooks
					(@RequestParam(value="email", required=true) String email){
		List<UtiliLivreDone> listeDone = this.iBooksDoneService.getAlluserDoneBooks(email);
		
		if(listeDone!=null) {
			return new ResponseEntity<List<UtiliLivreDone>>(listeDone,HttpStatus.OK);
		}
		else 
			return new ResponseEntity<List<UtiliLivreDone>>(listeDone,HttpStatus.NOT_FOUND);
	}
}
