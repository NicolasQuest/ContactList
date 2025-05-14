import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [imageToggles, setImageToggles] = useState({});
  const [pokemonData, setPokemonData] = useState(null);

  const navigate = useNavigate();

  const createAgenda = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/NicolasQuestAgenda",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("User created:", data);

      return data;
    } catch (error) {
      console.error("Couldn't create an agenda: ", error);
    }
  };

  const getAgendas = () => {
    fetch("https://playground.4geeks.com/contact/agendas/NicolasQuestAgenda")
      .then((response) => {
        if (!response.ok) {
          createAgenda();
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Agenda Loaded", data);
        dispatch({
          type: "save_contact",
          payload: data.contacts,
        });
      })
      .catch((error) => {
        console.error("Couldn't access the agenda, error: ", error);
      });
  };

  useEffect(() => {
    getAgendas();
  }, []);

  // alterno la imagen de un contacto según si su ID es par o impar
  const toggleImage = (contactId) => {
    setImageToggles((prev) => ({
      ...prev,
      [contactId]: !prev[contactId],
    }));
  };

  const getKokémon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      if (!response.ok) {
        throw new Error(
          `couln't access the pokedex,  error: ${response.statusText}`
        );
      }
      const data = await response.json();
      setPokemonData({
        name: data.name,
        image: data.sprites.front_default,
      });
    } catch (error) {
      console.error("error entering the pokedex: \n", error);
    }
  };

  const hideKokémon = () => {
    setPokemonData(null);
  }


  //
  return (
    <div className="text-center mt-5 mx-auto container">
      <div className="d-flex">
        <button
          onClick={async () => {
            try {
              const response = await fetch(
                "https://playground.4geeks.com/contact/agendas/NicolasQuestAgenda",
                {
                  method: "DELETE",
                }
              );

              if (!response.ok) {
                throw new Error(
                  `Error: ${response.status} ${response.statusText}`
                );
              }

              await createAgenda(); // Vuelves a crear la agenda
              getAgendas(); // Refrescas contactos
            } catch (error) {
              console.log("Error al eliminar la agenda:", error.message);
            }
          }}
          className="btn btn-danger mt-3 d-flex ms-auto mx-2"
        >
          Delete agenda
        </button>

        <button
          onClick={() => {
            navigate("/create-contact");
          }}
          className=" btn btn-primary mt-3 d-flex "
        >
          Create contact
        </button>
      </div>

      <ul className="px-0 mx-0 list-unstyled border border-dark rounded my-2 bg-dark">
        {store.contacts.length === 0 ? (
          <div className="bg-dark">
            <h1 className="text-white mt-4">Add your first contact</h1>
            <img
              className="charizard"
              style={{ width: "400px", height: "400px" }}
              src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png"
            />
          </div>
        ) : (
          store &&
          store.contacts?.map((contact) => {
            // Verifica si el ID del contacto es par o impar
            const isEven = contact.id % 2 === 0;
            return (
              <li
                key={contact.id}
                className="p-2 border-bottom border border-dark"
              >
                <div className="row caja">
                  <div className="d-flex align-items-center">
                    <div className="col-2 border-success">
                      {isEven ? (
                        <img
                          src="https://www.character.com/cdn/shop/files/pmts6994-Bulbasaur-Tee-3.jpg?v=1690469043&width=960"
                          alt="Bulbasaur"
                        />
                      ) : (
                        <img
                          src="https://www.character.com/cdn/shop/files/pmts5793-Squirtle-tee-3.jpg?crop=center&height=2560&v=1690282425&width=2560"
                          alt="Squirtle"
                        />
                      )}
                    </div>
                    <div className="col-10">
                      <div className="row">
                        <div className="d-flex align-items-center mb-2">
                          <h4 className="text-start ps-2 flex-grow-1 mb-0 text-white">
                            {contact.name}
                          </h4>
                          <div>
                            <i
                              className="fa-solid fa-pencil pt-1 px-2 hoverazo text-white"
                              onClick={() =>
                                navigate(`/edit-contact/${contact.id}`)
                              }
                            ></i>
                            <i
                              className="fa-solid fa-trash pt-1 px-2 hoverazo text-white"
                              onClick={() => {
                                fetch(
                                  `https://playground.4geeks.com/contact/agendas/NicolasQuestAgenda/contacts/${contact.id}`,
                                  {
                                    method: "DELETE",
                                  }
                                )
                                  .then((response) => {
                                    if (!response.ok) {
                                      throw new Error(response.statusText);
                                    }
                                  })
                                  .then(() => {
                                    dispatch({
                                      type: "delete_contact",
                                      payload: contact.id,
                                    });
                                  })
                                  .catch((error) => {
                                    console.error(
                                      "couldn't delete the contact, error: \n",
                                      error
                                    );
                                  });
                              }}
                            ></i>
                          </div>
                        </div>
                        <div className="d-flex">
                          <i className="fa-solid fa-envelope pt-1 px-2 text-white"></i>
                          <p className="text-white">{contact.email}</p>
                        </div>
                        <div className="d-flex">
                          <i className="fa-solid fa-phone pt-1 px-2 text-white"></i>
                          <p className="text-white">{contact.phone}</p>
                        </div>
                        <div className="d-flex">
                          <i className="fa-solid fa-location-dot pt-1 px-2 text-white"></i>
                          <p className="text-white">{contact.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
      { pokemonData !== null ? (
        <div>
        <div className="mt-4 text-white py-2 my-2 rounded">
          <h3 className="my-2"> {pokemonData.name}</h3>
          <img
            src={pokemonData.image}
            alt={pokemonData.name}
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <div>
        <button className="btn btn-dark rounded mx-1" onClick={getKokémon}>
          Get a randóm pókemon
        </button>
        <button className="btn btn-dark rounded mx-1" onClick={hideKokémon}>
          Hide pókemon 
        </button>
      </div>
        </div>
        
      ):(<button className="btn btn-dark rounded mx-1" onClick={getKokémon}>
        Get a randóm pokemon
      </button>)}
    </div>
  );
};
