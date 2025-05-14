// Import necessary components from react-router-dom and other parts of the application.
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CreateContact = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(
    {
      name: "",
      phone: "",
      email: "",
      address: "",
    
    },
  );

  const handleSumbit = async (e) => {
    e.preventDefault();

      try {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/NicolasQuestAgenda/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: inputs.name,
              phone: inputs.phone,
              email: inputs.email,
              address: inputs.address,
            }),
          }
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        await response.json();
        navigate("/");
      } catch (error) {
        console.error("Error creating contact", error);
      }
    };

  return (
    <div className="d-flex justify-content-center py-5 my-5">
      <form
        onSubmit={handleSumbit}
        style={{ width: "700px" }}
        className="p-4 border border-dark rounded shadow bg-dark d-flex flex-column gap-3"
      >
        <h1 className="text-center mb-4 text-white">Add a new contact</h1>

        <div className="form-group">
          <label htmlFor="inputName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Full Name"
            onChange={(e) => {
              setInputs({
                ...inputs,
                name: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail4">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter email"
            onChange={(e) => {
              setInputs({
                ...inputs,
                email: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPhone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            placeholder="Enter phone"
            onChange={(e) => {
              setInputs({
                ...inputs,
                phone: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputAddress2">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Enter adress"
            onChange={(e) => {
              setInputs({
                ...inputs,
                address: e.target.value,
              });
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success  w-100  me-1 mb-2"
        >
          Save
        </button>

        <Link to="/"> or get back to contacts</Link>
      </form>
    </div>
  );
};

export default CreateContact;
