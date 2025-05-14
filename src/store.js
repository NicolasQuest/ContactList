export const initialStore = () => {
  return {
    message: null,
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    /* case 'edit_task':

      const { id,name, email, phone, adress } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo,fullName:name,email:email,phone:phone,adress:adress} : todo))
      };
    */
    case "save_contact":
      return {
        ...store,
        contacts: action.payload,
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };

    default:
      throw Error("Unknown action.");
  }
}
