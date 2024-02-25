import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#fb246a',
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

export default function ApplicationSubmissionModal(props) {


  return (
    <div>
      <Modal
        sx={{ background: "#000000bd" }}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.submissionLoading ? <div style={{marginTop: "300px", marginLeft: "800px", color: "#fb246a"}}>
                                        <CircularProgress sx={{ color: "#fb246a" }} size={100} />
                                        <h4 style={{ color: "white", marginLeft: "-120px" }}>Submitting application. Please wait...</h4>
                                    </div> : <Box sx={style}>
          <h4 style={{ color: "white" }}>Your application was successfully sent. Goodluck!</h4>
          <div style={{ background: "white", color: "#fb246a", marginTop: 2, width: 80, margin: "auto", padding: 5, cursor: "pointer" }} onClick={() => props.handleOpen(false)}>close</div>
        </Box>}
      </Modal>
    </div>
  );
}
