/* eslint-disable arrow-body-style */
import React from 'react';
import './Formpagemodal.css';

const Formpagemodal = ({ isOpen, setIsOpen, handleDelete }) => {
  return (
    <div className="form-modal" style={{ display: isOpen ? '' : 'none' }}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header flex-column">
            <div className="icon-box">
              <i className="material-icons">&#xE5CD;</i>
            </div>
            <h4 className="modal-title w-100">Are you sure?</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete these records? This process cannot be undone.</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button onClick={handleDelete} type="button" className="btn btn-danger">
              Delete
            </button>
            <button onClick={() => setIsOpen(false)} type="button" className="btn btn-secondary" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formpagemodal;
