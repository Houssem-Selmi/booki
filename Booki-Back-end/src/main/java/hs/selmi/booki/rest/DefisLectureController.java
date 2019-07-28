package hs.selmi.booki.rest;

import java.util.List;
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

import hs.selmi.booki.domain.DefisLecture;
import hs.selmi.booki.service.DefisLectureService;
import hs.selmi.booki.service.IUtilisateurService;


@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("defislecture")
public class DefisLectureController {

	@Autowired
	DefisLectureService defisLectureService;

	
	@Autowired 
	IUtilisateurService utilisateurService;
	
	@GetMapping
	public List<DefisLecture> getAllDefisLecture(){
		return this.defisLectureService.getAllDefisLecture();
	}

	@PostMapping("/addChallengeToUSer")
	public ResponseEntity<Boolean> addChallengeToUse (@RequestBody ObjectNode json) {
		String email;
		int nbBook;
		try {
			email = new ObjectMapper().treeToValue(json.get("email"), String.class);
			nbBook = new ObjectMapper().treeToValue(json.get("nbBook"), Integer.class);
			this.defisLectureService.addChallengeToUser(nbBook, email);
			return new ResponseEntity<Boolean>(HttpStatus.OK);
			}
		catch(JsonProcessingException e) {
			System.out.println("Parsing Exception!!");
			e.printStackTrace();
			return new ResponseEntity<Boolean>(HttpStatus.NOT_ACCEPTABLE);

		}
		
		
	}
	
	@PostMapping(path="/create")
	public ResponseEntity<DefisLecture> create(@RequestBody DefisLecture defis){
		try {
			this.defisLectureService.saveDefis(defis);
			return new ResponseEntity<DefisLecture>(defis, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<DefisLecture>(HttpStatus.NOT_ACCEPTABLE);
		}

	}
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<DefisLecture> delete(@PathVariable("id") int id){
		Optional<DefisLecture> resultat = defisLectureService.findById(id);
			if(resultat.isPresent()) {
				this.defisLectureService.deleteDefis(resultat.get());
				return new ResponseEntity<>(HttpStatus.ACCEPTED);
			}
			else
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}
	
	
	@GetMapping("/getAllUserChallenges")
	public ResponseEntity<List<DefisLecture>> getAllUserChallenges
	(@RequestParam(value="email", required=true) String email ){
	
		return new ResponseEntity<List<DefisLecture>>
		(this.defisLectureService.getAllUserChallenges(email),HttpStatus.OK);
	}
	
	
	@PostMapping("/deleteChallengeFromUser")
	public ResponseEntity<Boolean> deleteChallengeFromUser
	(@RequestParam(value="email", required=true) String email, @RequestParam(value="nbBook", required=true) int nbBook ){
		boolean res = false;
			res = this.defisLectureService.deleteChallengeFromUser(nbBook, email);
			return new ResponseEntity<Boolean>(res,HttpStatus.OK);
			
	}
}
