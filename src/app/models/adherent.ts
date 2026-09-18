export interface Adherent {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  dateNaissance: string; // format ISO "YYYY-MM-DD"
}

// Pour la création, l'id n'existe pas encore
export type AdherentInput = Omit<Adherent, 'id'>;