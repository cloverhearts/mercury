const initializeState = {
  note: {
    dialog: {
      createNewNote: {
        isOpen: false,
        default: {
          title: "New Note"
        }
      },
      exportNote: {
        isOpen: false,
        target: {
          id: ''
        }
      }
    }
  }
};

export default initializeState;
