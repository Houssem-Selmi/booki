package hs.selmi.booki.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="DefisLectures")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DefisLecture {

@Id
@GeneratedValue
private int id;
private String titre;
private String description;
private String imageUrl;
private int nbreTotalLivre;
@ManyToMany(mappedBy = "defisLectures")
@JsonIgnore
private List<Utilisateur> utilisateur;




}
