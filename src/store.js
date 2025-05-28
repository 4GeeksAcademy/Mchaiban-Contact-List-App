export const initialStore = () => {
    return {
        BASE_URL: "https://playground.4geeks.com/contact/agendas",
        SLUG: "mariana",
        contacts: []
    };
};

/*
action = {
    type: "SET_CONTACTS",
    payload: contacts
}

*/

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case "SET_CONTACTS":
            const newStore = {...store};
            newStore.contacts = action.payload;
            return newStore;
        default:
            throw Error('Unknown action.');
    }
}
