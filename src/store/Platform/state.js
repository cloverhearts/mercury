const initializeState = {
  note: {
    dialog: {
      createNewNote: {
        isOpen: false,
        default: {
          title: "New Note",
          description: ''
        }
      },
      removeNote: {
        isOpen: false,
      },
      exportNote: {
        isOpen: false,
        target: {
          id: ''
        }
      },
      importNote: {
        isOpen: false,
      },
      configNote: {
        isOpen: false,
      },
      missingSaveNote: {
        targetNote: {}
      }
    }
  }
};

export default initializeState;
