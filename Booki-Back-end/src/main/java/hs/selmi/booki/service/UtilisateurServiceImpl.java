package hs.selmi.booki.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.domain.Role;
import hs.selmi.booki.domain.Utilisateur;
import hs.selmi.booki.exception.CustomException;
import hs.selmi.booki.repository.ILivresRepository;
import hs.selmi.booki.repository.IUtilisateursRepository;
import hs.selmi.booki.security.JwtTokenProvider;

@Service
public class UtilisateurServiceImpl implements IUtilisateurService {

	@Autowired
	IUtilisateursRepository utilisateurRepository;
	
	@Autowired
	IBooksDoneService booksdoneService;
	
	@Autowired 
	ILivresRepository livreRepository;
	
	 @Autowired
	  private PasswordEncoder passwordEncoder;

	  @Autowired
	  private JwtTokenProvider jwtTokenProvider;

	  @Autowired
	  private AuthenticationManager authenticationManager;

	  public String signin(String email, String password) {
	    try {
	      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
	      return jwtTokenProvider.createToken(email, utilisateurRepository.findByEmail(email).get().getRoles());
	    } catch (AuthenticationException e) {
	      throw new CustomException("Invalid username/password supplied",HttpStatus.UNPROCESSABLE_ENTITY);
	    }
	  }

	  public String signup(Utilisateur user) {
	    if (!utilisateurRepository.existsByEmail(user.getEmail())) {
	      user.setPassword(passwordEncoder.encode(user.getPassword()));
	      user.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_CLIENT)));

	      utilisateurRepository.save(user);
	      return jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
	    } else {
	      throw new CustomException("email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
	    }
	  }
	
	
	@Override
	public List<Utilisateur> getAllusers() {
		List<Utilisateur> clients = new ArrayList<>();
		this.utilisateurRepository.findAll().forEach( item -> {
			if(item.getRoles().contains(Role.ROLE_CLIENT) && !item.getRoles().contains(Role.ROLE_ADMIN) ) {
				clients.add(item);
			}
		});
		return clients;
	}

	
	@Override
	public boolean saveUser(Utilisateur utilisateur) {
		utilisateur.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_CLIENT)));
		utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));

		if(this.utilisateurRepository.save(utilisateur)!=null) return true;
		else 
			return false;
	}


	@Override
	public boolean deleteUser(Utilisateur utilisateur) {
		this.utilisateurRepository.delete(utilisateur);
		return true;
	}


	@Override
	public Optional<List<Utilisateur>> findByUsername(String username) {
		return this.utilisateurRepository.findByUsername(username);
	}


	@Override
	public Optional<Utilisateur> findById(int id) {
		return this.utilisateurRepository.findById(id);
	}


	@Override
	public Optional<Utilisateur> findByEmail(String email) {
		return this.utilisateurRepository.findByEmail(email);
	}


	@Override
	public boolean addBookToUser(Livre livre, Utilisateur utilisateur) {
		this.livreRepository.save(livre);
		Utilisateur user;
		 user =  this.utilisateurRepository.findByEmail(utilisateur.getEmail()).get();
		if(user!=null) {
		if(user.getLivres().add(livre)) {
			this.utilisateurRepository.save(user);
			return true;
		}
		}
		return false;
	}
	
	
	
	
	@Override
	public boolean removeBookFromUser(Livre livre, Utilisateur utilisateur) {
		if(utilisateur!=null) {
		if(utilisateur.getLivres().remove(livre)) {
			this.utilisateurRepository.save(utilisateur);
			return true;
		}
		}
		return false;
	}


	@Override
	public List<Livre> getUserBooks(String email) {
		Optional<Utilisateur> livreOpt = this.utilisateurRepository.findByEmail(email);
		Utilisateur user = livreOpt.isPresent() ? livreOpt.get() : null ;
		if(user!=null) {
			return user.getLivres();
		}
		return null;
	}


	@Override
	public boolean userHasBook(String isbn, String email) {
		// TODO Auto-generated method stub
		boolean trouve = false;
		List<Livre> livres = this.getUserBooks(email);
		for (Livre l : livres) {
			if(l.getIsbn().equals(isbn)) {
				trouve = true;
			}
		}
		return trouve;
	}


	@Override
	public Utilisateur findByEmailAndPassword(String email, String password) {
		Optional<Utilisateur> opt = this.utilisateurRepository.findByEmailAndPassword(email, password);
		if( opt.isPresent())
		return opt.get();
		else
			return null;
	}


	@Override
	public int getNubmerBookDoneOfUser(String email) {
		Optional<Utilisateur> userOpt = this.utilisateurRepository.findByEmail(email);
		if(userOpt.isPresent()) {
			return userOpt.get().getUserLivresDone().size();
		}
		return 0;
	}

	@Override
	public boolean updateUsername(String email, String username) {
		Optional<Utilisateur> opt = this.utilisateurRepository.findByEmail(email);
		Utilisateur user;
		if(opt.isPresent()) {
			user =  opt.get();
			user.setUsername(username);
			 this.utilisateurRepository.save(user);
			 return true;
		}
		return false;
	}

	@Override
	public boolean updatePassword(String email, String oldPass, String newPass) {
		Optional<Utilisateur> opt = this.utilisateurRepository.findByEmail(email);
		Utilisateur user;
		if(opt.isPresent()) {
			user =  opt.get();
			if(passwordEncoder.matches(oldPass, user.getPassword())) {
				user.setPassword(passwordEncoder.encode(newPass));
				 this.utilisateurRepository.save(user);
				 return true;
			}
		
		}
		return false;
	}

	@Override
	public boolean updateImageName(String email, String imgName) {
		Optional<Utilisateur> opt = this.utilisateurRepository.findByEmail(email);
		Utilisateur user;
		if(opt.isPresent()) {
			user =  opt.get();
			user.setImageName(imgName);
			 this.utilisateurRepository.save(user);
			 return true;
		}
		return false;
	}

	@Override
	public String getUserImage(String email) {
		Optional<Utilisateur> opt = this.utilisateurRepository.findByEmail(email);
		Utilisateur user;
		if(opt.isPresent()) {
			user =  opt.get();

			 return user.getImageName() ;
		}
		return "" ;
	}



	

}
