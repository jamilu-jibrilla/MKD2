/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import './Formpage.css';
import { baseURL, Api } from 'Utils/api';
import Formpagemodal from './Formpagemodal';
import Formadddmodal from './Formaddmodal';

const Formpage = () => {
  const companyId = localStorage.getItem('companyId');
  const [id, setId] = useState(0);
  const trash = 'https://cdn-icons-png.flaticon.com/512/3515/3515498.png';
  const [data, setData] = useState([]);

  useEffect(() => {
    let URL2 = baseURL + `companies/${companyId}/contract-forms`;
    Api.get(URL2, {}).then((res) => setData(res.data.data));
  }, []);

  const [formData, setFormData] = useState({
    company_id: companyId,
    name: '',
    replacement_tags: '',
    status: 'active',
    template: '',
    has_signature: true,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleDelete = () => {
    const newData = data.filter((item) => {
      return item.id != id;
    });

    let delItem = data.filter((item) => {
      return item.id == id;
    })[0];

    let URL = baseURL + `contract-forms/${delItem.id}`;

    Api.delete(URL, {}).then((res) => {
      setData(newData);
      setIsOpen(false);
    });
  };

  const handleSubmit = () => {
    let URL = baseURL + 'contract-forms';

    const reqBody = {
      company_id: formData.company_id,
      name: formData.name,
      replacement_tags: formData.replacement_tags,
      status: formData.status,
      template: formData.template,
      has_signature: formData.has_signature,
    };

    Api.post(URL, reqBody).then((res) => {
      let data = res.data.data;
      setData((prev) => {
        return [
          {
            id: data.id,
            name: data.name,
            date: data.created_at,
            companyId: data.company_id,
          },
          ...prev,
        ];
      });

      setFormData({
        company_id: companyId,
        name: '',
        replacement_tags: '',
        status: 'active',
        template: '',
        has_signature: true,
      });
      setIsOpen2(false);
    });
  };

  return (
    <div className="forms-page">
      <Formpagemodal isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDelete} />
      <Formadddmodal isOpen2={isOpen2} setIsOpen2={setIsOpen2} handleSubmit={handleSubmit} setFormData={setFormData} />

      <div className="">
        <button className="form-tab">Contract Forms</button>
      </div>

      <div className="container">
        <div className="form_header">
          <span className="form-h2">Form Templates </span>
          <button onClick={() => setIsOpen2(true)} className="form-add">
            Add +
          </button>
        </div>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1"></div>
            <div className="col col-2">TEMPLATE NAME</div>
            <div className="col col-3">DATE CREATED</div>
            <div className="col col-4"></div>
          </li>
          {data.length > 0 ? (
            data.map((card) => (
              <li key={card.id} className="table-row">
                <div className="col col-1" data-label="Job Id"></div>
                <div className="col col-2" data-label="Customer Name">
                  {card.name}
                </div>
                <div className="col col-3" data-label="Amount">
                  {new Date(card.created_at).toDateString()}
                </div>
                <div className="col col-4" data-label="Payment Status">
                  <img
                    onClick={() => {
                      setId(card.id);
                      setIsOpen(true);
                    }}
                    width="20px"
                    height="20px"
                    src={trash}
                    alt="trash"
                  />
                </div>
              </li>
            ))
          ) : (
            <div>Loading</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Formpage;
