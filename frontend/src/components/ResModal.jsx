import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import instance from "/src/auth/axios";
import '/src/css/ResModal.css';

Modal.setAppElement('#root'); // 필수 설정

const ResModal = ({
  isOpen = false,
  toggle = () => { },
  title = "",
  reload = () => { },
  selectedItem = {},
}) => {
  const [resName, setResName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("C");
  const [id, setId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      setIsUpdate(true);
      setId(selectedItem.id);
      setResName(selectedItem.name || "");
      setLinkUrl(selectedItem.linkUrl || "");
      setRemark(selectedItem.remark || "");
      setStatus("U");
    } else {
      setIsUpdate(false);
      setId("");
      setResName("");
      setLinkUrl("");
      setRemark("");
      setStatus("C");
    }
    setSuccessMsg("");
    setIsSuccess(false);
  }, [selectedItem])

  const onChangeResName = (e) => {
    changeValue();
    setResName(e.target.value);
  };
  const onChangeLinkUrl = (e) => {
    changeValue();
    setLinkUrl(e.target.value);
  };
  const onChangeRemark = (e) => {
    changeValue();
    setRemark(e.target.value);
  };

  const changeValue = () => {
    setSuccessMsg('');
    setIsSuccess(false);
  }

  const handleCancelClick = () => {
    toggle();
  };

  const handleSendClick = async () => {

    if (!resName) {
      alert('storeName is required');
      return;
    }

    const msgDom = document.getElementById('successMsg');
    msgDom.className = "success-message";
    try {
      await instance.post("/res", {
        id: id,
        name: resName,
        linkUrl: linkUrl,
        remark: remark,
        status: status
      });
      setIsSuccess(true);
      setSuccessMsg('Success');
      msgDom.classList.add('fc-blue');
      setTimeout(() => { reload(); toggle(); }, 1000);
    } catch (error) {
      setSuccessMsg('Fail');
      msgDom.classList.add('fc-red');
      console.error("report Error " + error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCancelClick}
        className="modal-wrap"
        overlayClassName="modalOverlay"
      >
        <div className="modal-header-wrap">
          <div className="modal-header">
            <span>{title}</span>
            <button
              className="modal-close-button"
              onClick={handleCancelClick}>
              X
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="grid-box">
            <label className="grid-title" for="storeName">storeName</label>
            <input
              type="text"
              className="grid-input"
              value={resName}
              id="storeName"
              onChange={onChangeResName}
              disabled={isSuccess || isUpdate}
            />
          </div>
          <div className="grid-box">
            <label className="grid-title" for="link" >Link</label>
            <input
              type="text"
              className="grid-input"
              value={linkUrl}
              id="link"
              onChange={onChangeLinkUrl}
            />
          </div>
          <div className="grid-box">
            <label className="grid-title" for="remark">description</label>
            <input
              type="text"
              className="grid-input"
              value={remark}
              id="remark"
              onChange={onChangeRemark}
            />
          </div>

        </div>
        <div className="modal-footer">
          <p id="successMsg" className="success-message">{successMsg}</p>
          {!isSuccess &&
            <div className="buttons">
              <button className="cancel-button" onClick={handleCancelClick}>cancel</button>
              <button className="save-button" onClick={handleSendClick}>save changes</button>
            </div>}
        </div>

      </Modal>
    </>
  );
};

export default ResModal;
