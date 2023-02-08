/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import './Formpage.css';
import { generateUUID } from 'Utils/helpers';
import { baseURL, Api } from 'Utils/api';
import Formpagemodal from './Formpagemodal';
import Formadddmodal from './Formaddmodal';

const Formpage = () => {
  const [id, setId] = useState(0);
  const trash = 'https://cdn-icons-png.flaticon.com/512/3515/3515498.png';

  const [data, setData] = useState([
    { id: '1', name: 'Ben test', date: 'Aug 4, 2022' },
    { id: '2', name: 'Ben test no sign', date: 'Aug 4, 2022' },
    { id: '3', name: 'Pau test', date: 'Aug 4, 2022' },
    { id: '4', name: 'sss', date: 'Aug 4, 2022' },
    { id: '5', name: 'Sow signature', date: 'Aug 4, 2022' },
  ]);

  const [formData, setFormData] = useState({
    company_id: '',
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
    if (delItem.companyId) {
      let URL = baseURL + `contract-forms/${delItem.companyId}`;
      Api.delete(URL, {}).then((res) => {
        console.log(res);
      });
    }
    setData(newData);
    setIsOpen(false);
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
            id: generateUUID(),
            name: data.name,
            date: new Date(data.created_at).toDateString(),
            companyId: data.company_id,
          },
          ...prev,
        ];
      });

      setFormData({
        company_id: '',
        name: '',
        replacement_tags: '',
        status: 'active',
        template: '',
        has_signature: true,
      });
      setIsOpen2(false);
    });

    // let URL2 = baseURL + 'companies/1/contract-forms';
    // Api.get(URL2, {}).then((res) => console.log(res));
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
                  {card.date}
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
