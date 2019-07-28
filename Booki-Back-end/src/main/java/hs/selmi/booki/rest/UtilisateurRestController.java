package hs.selmi.booki.rest;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.domain.Utilisateur;
import hs.selmi.booki.service.ILivreService;
import hs.selmi.booki.service.IUtilisateurService;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("utilisateurs")
public class UtilisateurRestController {
	
	@Autowired 
	IUtilisateurService utilisateurService;
	@Autowired
	ILivreService livreService;
	
	
	@GetMapping
	public List<Utilisateur> getAllUsers(){
		return this.utilisateurService.getAllusers();
	}

	
	
	 
	  @PostMapping("/signin")
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 422, message = "Invalid username/password supplied")})
	  public Map<String,String> login(//
	      @ApiParam("email") @RequestParam String email, //
	      @ApiParam("password") @RequestParam String password) {
	    return Collections.singletonMap("token", utilisateurService.signin(email, password));
	  }

	  @PostMapping("/signup")
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 403, message = "Access denied"), //
	      @ApiResponse(code = 422, message = "Username is already in use"), //
	      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
	  public ResponseEntity<Map<String,String>> signup(@ApiParam("Signup User") @RequestBody Utilisateur user) {
		  user.setImageName("default.png");
	    return new ResponseEntity<Map<String,String>>(Collections.singletonMap("token", utilisateurService.signup(user)),HttpStatus.OK);
	  }

	
	@GetMapping(path="/getUser")
	public ResponseEntity<Utilisateur> getUser(@RequestParam(value="email", required=true) String email){
		Utilisateur user = this.utilisateurService.findByEmail(email).get();
		
			return new ResponseEntity<Utilisateur>(user,HttpStatus.OK);
		}
	
	
	@GetMapping(path="/getCountBooksDone")
	public ResponseEntity<Integer> getCountBooksDone(@RequestParam(value="email", required=true) String email ) 
	{
		int count = this.utilisateurService.getNubmerBookDoneOfUser(email);
			return new ResponseEntity<Integer>(count,HttpStatus.OK);
		}
	
	
	@GetMapping(path="/checkMail")
	public ResponseEntity<Boolean> checkEmail(@RequestParam(value="email", required=true) String email
			){
		Optional<Utilisateur> opt = this.utilisateurService.findByEmail(email);
		if(opt.isPresent())
			return new ResponseEntity<Boolean>(true,HttpStatus.OK);
		else 
			return new ResponseEntity<Boolean>(false,HttpStatus.OK);

		}
	
	@GetMapping(path="/getUserImageName")
	public Map<String,String> getUserImageName(@RequestParam(value="email", required=true) String email
			){
	    return Collections.singletonMap("imgn",this.utilisateurService.getUserImage(email));

		}
	
	@PostMapping(path="/getUser")
	public ResponseEntity<Utilisateur> getUserp( @RequestBody Utilisateur user
			){
		Utilisateur userp = this.utilisateurService.findByEmailAndPassword(user.getEmail(),user.getPassword());
		
			return new ResponseEntity<Utilisateur>(userp,HttpStatus.OK);
		}
	
	@PostMapping(path="/create")
	public ResponseEntity<Utilisateur> create(@RequestBody Utilisateur utilisateur){
		
		try {
			this.utilisateurService.saveUser(utilisateur);
			return new ResponseEntity<Utilisateur>(utilisateur,HttpStatus.ACCEPTED);
		}
		catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

		}
	}
	
	@PostMapping(path="/updateUsername")
	public ResponseEntity<Boolean> updateUsername( @RequestBody ObjectNode json
			){
		String email;
		String username;
		try {
			email = new ObjectMapper().treeToValue(json.get("email"), String.class);
			username = new ObjectMapper().treeToValue(json.get("username"), String.class);
			boolean test = this.utilisateurService.updateUsername(email, username);
			if(test)
			return new ResponseEntity<Boolean>(test,HttpStatus.OK);

		} catch (JsonProcessingException e) {
			System.out.println("Parsing Exception!!");
			e.printStackTrace();
			return new ResponseEntity<Boolean>(false,HttpStatus.NOT_ACCEPTABLE);

		}			
		return new ResponseEntity<Boolean>(false,HttpStatus.NOT_ACCEPTABLE);

			
		}
	
	@PostMapping(path="/updateImageName")
	public ResponseEntity<Boolean> updateImageName( @RequestBody ObjectNode json
			){
		String email;
		String imageName;
		try {
			email = new ObjectMapper().treeToValue(json.get("email"), String.class);
			imageName = new ObjectMapper().treeToValue(json.get("imageName"), String.class);
			boolean test = this.utilisateurService.updateImageName(email, imageName);
			if(test)
			return new ResponseEntity<Boolean>(test,HttpStatus.OK);

		} catch (JsonProcessingException e) {
			System.out.println("Parsing Exception!!");
			e.printStackTrace();
			return new ResponseEntity<Boolean>(false,HttpStatus.NOT_ACCEPTABLE);

		}			
		return new ResponseEntity<Boolean>(false,HttpStatus.NOT_ACCEPTABLE);

			
		}
	
	
	
	
	
	@PostMapping(path="/updatePassword")
	public ResponseEntity<Boolean> updatePassword( @RequestBody ObjectNode json
			){
		String email;
		String oldPass;
		String newPass;

		try {
			email = new ObjectMapper().treeToValue(json.get("email"), String.class);
			oldPass = new ObjectMapper().treeToValue(json.get("oldPass"), String.class);
			newPass = new ObjectMapper().treeToValue(json.get("newPass"), String.class);

			boolean test = this.utilisateurService.updatePassword(email, oldPass, newPass);
			if(test)
			return new ResponseEntity<Boolean>(test,HttpStatus.OK);

		} catch (JsonProcessingException e) {
			System.out.println("Parsing Exception!!");
			e.printStackTrace();
			return new ResponseEntity<Boolean>(false,HttpStatus.NOT_ACCEPTABLE);

		}			
		return new ResponseEntity<Boolean>(false,HttpStatus.NOT_ACCEPTABLE);

			
		}
	
	
	@PostMapping(path="/addBookToUser")
	public ResponseEntity<Livre> addBookToUser(@RequestBody ObjectNode json){
		Utilisateur user = new Utilisateur();
		Livre bookToAdd = new Livre();
		try {
			user = new ObjectMapper().treeToValue(json.get("user"), Utilisateur.class);
			bookToAdd = new ObjectMapper().treeToValue(json.get("livre"), Livre.class);
			boolean test = this.utilisateurService.addBookToUser(bookToAdd,user);
			if(test)
			return new ResponseEntity<Livre>(bookToAdd,HttpStatus.OK);

		} catch (JsonProcessingException e) {
			System.out.println("Parsing Exception!!");
			e.printStackTrace();
			return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);

		}
		return new ResponseEntity<Livre>(HttpStatus.NOT_ACCEPTABLE);

	}
	
	
	
	
	@GetMapping(path="/getUserBooks")
	public ResponseEntity<List<Livre>> getUserBooks(@RequestParam(value="email", required=true) String email){
		List<Livre> res = this.utilisateurService.getUserBooks(email);
		if(res!=null) {
			return new ResponseEntity<List<Livre>>(res,HttpStatus.OK);
		}
		else 
			return new ResponseEntity<List<Livre>>(res,HttpStatus.NOT_FOUND);
	}
	
	@GetMapping(path="/getUserHasBook")
	public ResponseEntity<Boolean> getUserHasBook(@RequestParam(value="email", required=true) String email,
				@RequestParam(value="isbn", required=true) String isbn
			){
		boolean res = this.utilisateurService.userHasBook(isbn, email);
		
			return new ResponseEntity<Boolean>(res,HttpStatus.OK);
		}
		
	
	@PostMapping(path="/deleteBookFromUser")
	public ResponseEntity<Boolean> deleteBookFromUser(@RequestBody ObjectNode json){
		Utilisateur user = new Utilisateur();
		Livre bookToRemove = new Livre();
			String isbn = json.get("isbn").asText();
			String email = json.get("email").asText();
			user = this.utilisateurService.findByEmail(email).get();
			bookToRemove = this.livreService.findByIsbn(isbn).get();
			boolean done = this.utilisateurService.removeBookFromUser(bookToRemove, user);
		return new ResponseEntity<Boolean>(done,HttpStatus.OK);

	}
	
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Livre> delete(@PathVariable("id") int id){
		Optional<Utilisateur> resultat = this.utilisateurService.findById(id);
			if(resultat.isPresent()) {
				this.utilisateurService.deleteUser(resultat.get());
				return new ResponseEntity<>(HttpStatus.ACCEPTED);
			}
			else
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}
	
	
	
	
	
	

}
