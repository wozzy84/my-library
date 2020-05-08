export const intialInfo = {
  title:"",
  author:"",
  publisher: "",
  date: new Date(),
  owner:"",
  library:"",
  genre: "",
  format:"",
  download: "",
}


function userReducer(state = {}, action) {
  switch (action.type) {
    case "LOGGED_USER":
      return action.user;
    default:
      return state;
  }
}

function drawerOpen(state = true, action) {
  switch (action.type) {
    case "DRAWER_OPEN":
      return action.open;
    default:
      return state;
  }
}

function openAddModal(state = false, action) {
  switch (action.type) {
    case "OPEN_ADD_MODAL":
      return action.open;
    default:
      return state;
  }
}

function updateTable(state = 1, action) {
  switch (action.type) {
    case "TABLE_UPDATED":
      const updated = state + 1;
      return updated;
    default:
      return state;
  }
}

function handleDownloadLink(state = "", action) {
  switch (action.type) {
    case "DOWNLOAD_LINK":
      return action.link;
    default:
      return state;
  }
}

function setReference(state = "", action) {
  switch (action.type) {
    case "SET_REFERENCE":
      return action.reference;
    default:
      return state;
  }
}

function clearStorage (state = false, action) {
  switch (action.type) {
    case "CLEAR_STORAGE":
      return action.clear;
    default:
      return state;
  }
}

function openInfoModal (state={open:false, data:intialInfo}, action) {
  switch(action.type) {
    case "OPEN_INFO_MODAL":
      return action.payload
    default: 
    return state
  }
}

function openAnyModal (state=false, action) {
  switch(action.type) {
    case "OPEN_ANY_MODAL":
      return action.open
    default:
      return state
  }
}

function isEditing (state=false, action) {
  switch(action.type) {
    case "IS_EDITING":
      return action.edit
      default: 
      return state
  }
}

export {
  userReducer,
  drawerOpen,
  openAddModal,
  updateTable,
  handleDownloadLink,
  setReference,
  clearStorage,
  openInfoModal,
  isEditing,
  openAnyModal
};
