import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Button,
  Dialog,
  Classes,
  Intent
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import PlatformActions from "../../../../store/Platform/actions";
import NoteActions from "../../../../store/Note/actions";
import ApplicationInformation from "../../../../application";
import "./NoteExportDialog.scss";

export default props => {
  const EXPORT_STATE = {
    READY: "Export note",
    EXPORTING: "Exporting...",
    DONE: "Done"
  };
  const isOpen = useSelector(
    state => state.platform.note.dialog.exportNote.isOpen
  );
  const noteId = useSelector(
    state => state.platform.note.dialog.exportNote.target.id
  );
  const exportTarget = useSelector(state => state.note.current.exportNote);
  const [exporting, setExporting] = useState(EXPORT_STATE.READY);
  const dispatch = useDispatch();
  const options = {
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  };

  const onClose = useCallback(
    e => {
      e.preventDefault();
      dispatch(PlatformActions.closeExportNoteDialog());
      dispatch(NoteActions.clearExportNote());
    },
    [isOpen]
  );

  const onExport = useCallback(
    e => {
      e.preventDefault();
      setExporting(EXPORT_STATE.EXPORTING);
      dispatch(NoteActions.exportNote({ id: noteId }));
    },
    [isOpen, noteId]
  );

  useEffect(() => {
    setExporting(EXPORT_STATE.READY);
  }, [isOpen]);

  useEffect(() => {
    if (exportTarget.id && exporting === EXPORT_STATE.EXPORTING) {
      // unsafe download code.
      const downloadFileName = `mercury-note-${exportTarget.id}.mcr`;
      const virtualDownloadLink = document.createElement("a");
      const serializedExportFile = {
        version: `${ApplicationInformation.version}`,
        "what-is-a-this-file": `This is a exported Mercury note file. if Do you want use this file, You can download here ${ApplicationInformation.downloadUrl}`,
        ...exportTarget.toSerialize()
      };
      virtualDownloadLink.href = `data:application/vnd.mercury.note+json,${encodeURIComponent(
        JSON.stringify(serializedExportFile)
      )}`;
      virtualDownloadLink.style.display = "none";
      virtualDownloadLink.download = downloadFileName;
      virtualDownloadLink.setAttribute("download", downloadFileName);
      document.body.appendChild(virtualDownloadLink);
      virtualDownloadLink.click();
      virtualDownloadLink.remove();
      setExporting(EXPORT_STATE.DONE);
    }
  }, [exportTarget, exporting]);
  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        title={`Export note`}
        className={`mercury-export-note-dialog ${Classes.DIALOG} `}
        {...options}
        isOpen={isOpen}
      >
        <div
          className={`mercury-export-note-dialog-content ${Classes.DIALOG_BODY} `}
        >
          <p>Do you want to export this note?</p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button
              onClick={onExport}
              intent={Intent.PRIMARY}
              disabled={exporting !== EXPORT_STATE.READY}
            >
              {exporting}
            </Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
