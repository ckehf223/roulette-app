import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import instance from "/src/common/axios";

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
  }, [selectedItem])

  const onChangeResName = (e) => {
    setResName(e.target.value);
  };
  const onChangeLinkUrl = (e) => {
    setLinkUrl(e.target.value);
  };
  const onChangeRemark = (e) => {
    setRemark(e.target.value);
  };
  const handleCancelClick = () => {
    setResName("");
    setLinkUrl("");
    setRemark("");
    setSuccessMsg('');
    setIsSuccess(false);
    setIsUpdate(false);
    toggle();
  };

  const handleSendClick = async () => {
    if (!resName) {
      alert('음식점명은 필수값입니다.');
      return;
    }

    try {
      await instance.post("/res",
        {
          id: id,
          name: resName,
          linkUrl: linkUrl,
          remark: remark,
          status: status
        }
      );
      setIsSuccess(true);
      setSuccessMsg('등록완료');
      setTimeout(() => { reload() }, 1000);
    } catch (error) {
      setSuccessMsg('등록실패');
      console.error("report Error " + error);
    }
  };

  return (
    <Modal className="ReportModal" isOpen={isOpen} toggle={toggle} centered>
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader className="ReportModalHeader">
            <span>{title}</span>
            <button
              className="ReportModalCloseButton"
              onClick={handleCancelClick}>
              X
            </button>
          </ModalHeader>
          <ModalBody className="ReportModalBody">
            <div className="ReportModalTargetIdArea">
            </div>
            <div className="ReportModalContentArea">
              <table className="modalTable">
                <colgroup>
                  <col style={{ width: '80px' }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th>음식점 명</th>
                    <td>
                      <input
                        type="text"
                        value={resName}
                        onChange={(e) => { onChangeResName(e) }}
                        placeholder="음식점 명 입력하세요"
                        disabled={isSuccess || isUpdate}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>링크 주소</th>
                    <td>
                      <input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => { onChangeLinkUrl(e) }}
                        placeholder="링크 주소 입력하세요"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>
                      <input
                        type="text"
                        value={remark}
                        onChange={(e) => { onChangeRemark(e) }}
                        placeholder="비고 입력하세요"
                      />
                    </td>
                  </tr>

                </tbody>
              </table>

            </div>
            <div className="ReportModalSendButtonArea">
              <button className="ReportModalSendButton" onClick={() => { handleSendClick() }}>등록</button>
            </div>
            {isSuccess && <p className="ReportModalSuccessMessage">
              {successMsg}
            </p>}
          </ModalBody>
        </div>
      </div >
    </Modal >
  );
};

export default ResModal;