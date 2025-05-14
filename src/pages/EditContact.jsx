import React,{useState} from 'react'
import { Link,useParams,useNavigate} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const EditContact = () => {

  const navigate = useNavigate();
  const { theIdUser } = useParams()
  const { store, dispatch } = useGlobalReducer();
  

  const contact =  store.contacts?.find((item) => (item.id) === Number(theIdUser));
    
  
  const [newInputs, setNewInputs] = useState({
    name: contact?.name ,
    phone: contact?.phone ,
    email: contact?.email ,
    address: contact?.address ,
  });

    const handleUpdate = async(e) => {  
      e.preventDefault();

      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/NicolasQuestAgenda/contacts/${contact.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newInputs.name,
              phone: newInputs.phone,
              email: newInputs.email,
              address: newInputs.address,
            }),
          }
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        await response.json();
        navigate("/");
      } catch (error) {
        console.error("Error creating contact", error);
      }
  }


  return (
     <div className="d-flex justify-content-center py-5 my-5">
       
          <form
            onSubmit={handleUpdate}
            style={{ width: "700px" }}
            className="p-4 border border-dark rounded shadow bg-dark d-flex flex-column gap-3"
          >
            <h2 className="text-center mb-4 text-white">Edit your info, ID: {contact?.id}</h2>
    
            <div className="form-group">
              <label htmlFor="inputAddress">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                value= {newInputs.name}
                onChange={(e) => {
                  setNewInputs({
                    ...newInputs,
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
                value= {newInputs.email}
                onChange={(e) => {setNewInputs({
                  ...newInputs,
                  email: e.target.value,
                })}}
               
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="inputPhone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="inputPhone"
                value= {newInputs.phone}
                onChange={(e) => {setNewInputs({
                  ...newInputs,
                  phone: e.target.value,
                })}}
               
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="inputAddress2">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                value= {newInputs.address}
                onChange={(e) =>{setNewInputs({
                  ...newInputs,
                  address: e.target.value,
                })}}
               
              />
            </div>
    
            <button
              type="submit"
              className="btn  btn-success w-100  me-1 mb-2"
            >
              Edit & Save
            </button>
    
            <Link  to="/"> or get back to contacts</Link>
          </form>
        </div>
  );
}

export default EditContact  
