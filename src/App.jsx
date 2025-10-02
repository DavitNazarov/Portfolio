import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <section
        id="home"
        className="h-screen flex items-center justify-center bg-gray-100"
      >
        <h1 className="text-4xl font-bold">Home Section</h1>
      </section>
      <section
        id="skills"
        className="h-screen flex items-center justify-center bg-green-100"
      >
        <h1 className="text-4xl font-bold">Skills Section</h1>
      </section>
      <section
        id="projects"
        className="h-screen flex items-center justify-center bg-yellow-100"
      >
        <h1 className="text-4xl font-bold">Projects Section</h1>
      </section>
      <section
        id="experience"
        className="h-screen flex items-center justify-center bg-purple-100"
      >
        <h1 className="text-4xl font-bold">Experience Section</h1>
      </section>
      <section
        id="awards"
        className="h-screen flex items-center justify-center bg-red-100"
      >
        <h1 className="text-4xl font-bold">Awards Section</h1>
      </section>
      <section
        id="contact"
        className="h-screen flex items-center justify-center bg-blue-100"
      >
        <h1 className="text-4xl font-bold">Contact Section</h1>
      </section>
    </>
  );
}

export default App;
