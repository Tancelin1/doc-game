import AuthenticationComponent from "../components/Auth"


export default function loginPage() {
  return (
    <>
      <h1>Bienvenue sur DiscoComicsGames</h1>
      <p> vous verrez si dessous une liste de jeux vidéo ou apparaisse vos personnage préférée</p>
      <AuthenticationComponent />
    </>
  );
}
