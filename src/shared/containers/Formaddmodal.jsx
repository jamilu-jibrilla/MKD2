/* eslint-disable arrow-body-style */
import React from 'react';
import './Formaddmodal.css';

const Formaddmodal = ({ isOpen2, setIsOpen2, setFormData, handleSubmit }) => {
  const handleInputChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="form-modal" style={{ display: isOpen2 ? '' : 'none' }}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h4 className="modal-title w-100 font-weight-bold">Add Contract Form</h4>
            <button
              onClick={() => setIsOpen2(false)}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body mx-3">
            <div className="md-form mb-3">
              <input
                type="text"
                id="form34"
                onInput={handleInputChange}
                name="name"
                className="form-control validate"
              />
              <label data-error="wrong" data-success="right" htmlFor="form34">
                Form name
              </label>
            </div>

            <div className="md-form mb-3">
              <input
                type="number"
                id="form29"
                onInput={handleInputChange}
                name="company_id"
                className="form-control validate"
              />
              <label data-error="wrong" data-success="right" htmlFor="form29">
                Company_id
              </label>
            </div>

            <div className="md-form mb-3">
              <input
                type="text"
                id="form27"
                onInput={handleInputChange}
                name="template"
                className="form-control validate"
              />
              <label data-error="wrong" data-success="right" htmlFor="form29">
                Template
              </label>
            </div>

            <div className="md-form mb-3">
              <input
                type="text"
                name="replacement_tags"
                onInput={handleInputChange}
                checked
                id="form32"
                className="form-control validate"
              />
              <label data-error="wrong" data-success="right">
                replacement_tags
              </label>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button onClick={handleSubmit} className="btn btn-unique">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formaddmodal;
