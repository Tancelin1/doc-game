import AuthenticationComponent from "./components/Auth";
import FirestoreCrudComponent from "./components/FirestoreCrudComponent";

export default function ReactRootComponent() {
  return (
    <>
      <h1>Bienvenue sur DiscoComicsGames</h1>
      <p> vous verrez si dessous une liste de jeux vidéo ou apparaisse vos personnage préférée</p>
      <AuthenticationComponent />
      <FirestoreCrudComponent />
    </>
  );
}
