package hs.selmi.booki.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Utilisateurs")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Utilisateur {
	@Id
	@GeneratedValue
	private int id;
	private String username;
	private String imageName;
	@Column(unique = true, nullable = false)
	private String email;
	private String password;
	@ManyToMany
	private List<Livre> livres;
	
	public Utilisateur(String username, String email) {
		super();
		this.username = 
		this.email = email;
	}
	
	@ManyToMany/*(mappedBy="utilisateur")*/
	private List<DefisLecture> defisLectures;

	@ElementCollection(fetch = FetchType.EAGER)
	  List<Role> roles;
	
	
	 @OneToMany(
		        mappedBy = "userDone",
		        cascade = CascadeType.ALL,
		        orphanRemoval = true
		    )
	    	@JsonIgnore
		    private List<UtiliLivreDone> userLivresDone = new ArrayList<>();
}
