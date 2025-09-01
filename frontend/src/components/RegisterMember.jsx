import React, { useEffect, useState } from 'react';
import '/src/css/RegisterMember.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '/src/common/AuthContext'
import instance from "/src/auth/axios";
import { useNavigate } from 'react-router-dom';

const RegisterMember = () => {

  const { isAuthenticated } = useAuth();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordCheckError, setPasswordCheckError] = useState(null);
  const [userNameError, setUserNameError] = useState('');
  const [userNameSuccess, setUserNameSuccess] = useState('');
  const [userEmailError, setUserEmailError] = useState('');
  const [userEmailSuccess, setUserEmailSuccess] = useState('');

  const nav = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      nav('/');
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (!userNameError && !userEmailError && !passwordError && !passwordCheckError) {
      try {
        await instance.post('/member/join',
          {
            email: formData.email,
            password: formData.password,
            username: formData.username,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        ).then(response => {
          if (response.status === 200) {
            alert('회원가입이 완료되었습니다.');
            nav('/login', { replace: true });
          }
        })
      } catch (error) {
        console.log("회원가입시 에러 발생" + error)
      }
    } else {
      alert('입력된 정보를 확인해주세요.');
    }
  };

  const validateUsername = async (e) => {
    if (!formData.username) {
      return;
    }

    const nameRegex = /^[A-Za-z0-9]{4,}$/;
    if (!nameRegex.test(formData.username)) {
      setUserNameError('4글자 이상 입력해주세요.');
      setUserNameSuccess('');
      return;
    }

    try {
      const response = await instance.get('/member/checkId?id=' + formData.username,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        if (response.data > 0) {
          setUserNameError('중복된 아이디입니다.');
          setUserNameSuccess('')
        } else {
          setUserNameSuccess('사용가능한 아이디입니다.');
          setUserNameError('')
        }
      }
    } catch (error) {
      console.log("아이디 중복체크 에러: " + error);
    }
  }

  const validateEmail = async (e) => {
    if (!formData.email) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setUserEmailError('유효하지 않은 이메일 주소입니다.');
      setUserEmailSuccess('')
      return;
    }


    try {
      const response = await instance.get('/member/checkEmail?email=' + formData.email,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        if (response.data > 0) {
          setUserEmailError('중복된 이메일입니다.');
          setUserEmailSuccess('')
        } else {
          setUserEmailSuccess('사용가능한 이메일입니다.');
          setUserEmailError('')
        }
      }
    } catch (error) {
      console.log("이메일 중복체크 에러: " + error);
    }
  };

  const validatePasswordPatten = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('비밀번호는 8~12자 영문, 숫자, 특수문자 혼합이어야 합니다.');
    } else {
      setPasswordError('');
    }
  }

  const validatePasswordMatch = () => {
    if (formData.password !== formData.passwordCheck) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordCheckVisibility = () => {
    setPasswordCheckVisible(!passwordCheckVisible);
  };

  return (
    <div className='RegisterMemberWrap'>
      <div className="RegisterMember">
        <div className='RegisterMemberLogoArea'>
          <img src="/images/main-logo.png"></img>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>

          <div className="RegisterMemberInputBox">
            <div className='RegisterMemberInputArea'>
              <label htmlFor="username"><span className='InputStarSpan'>*</span>아이디</label>
              <input className='RegisterInput' type="text" id="username" name="username" value={formData.username}
                onChange={handleChange} onBlur={() => { validateUsername() }} />
            </div>
            <div className='RegisterMemberErrorArea'>
              <div className='blank_div'></div>
              {userNameError && <span className="error">{userNameError}</span>}
              {userNameSuccess && <span className="success">{userNameSuccess}</span>}
            </div>
          </div>


          <div className="RegisterMemberInputBox">
            <div className='RegisterMemberInputArea'>
              <label htmlFor="email"><span className='InputStarSpan'>*</span> 이메일</label>
              <input className='RegisterInput' type="email" id="email" name="email" value={formData.email} placeholder='이메일 형식에 맞게 작성하세요.'
                onChange={handleChange} onBlur={validateEmail} required />
            </div>
            <div className='RegisterMemberErrorArea'>
              <div className='blank_div'></div>
              {userEmailError && <span className="error">{userEmailError}</span>}
              {userEmailSuccess && <span className="success">{userEmailSuccess}</span>}
            </div>
          </div>

          <div className="RegisterMemberInputBox">
            <div className='RegisterMemberInputArea'>
              <label htmlFor="password"><span className='InputStarSpan'>*</span> 비밀번호</label>
              <input className='RegisterInput' type={passwordVisible ? "text" : "password"} id='password' name="password" value={formData.password}
                onChange={handleChange} onBlur={validatePasswordPatten} required placeholder='8~12자 영문,숫자,특수문자 혼합입니다.' />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon className='EyeSlashIcon' icon={passwordVisible ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className='RegisterMemberErrorArea'>
              <div className='blank_div'></div>
              {passwordError && <span className='error'>{passwordError}</span>}
            </div>
          </div>

          <div className="RegisterMemberInputBox">
            <div className='RegisterMemberInputArea'>
              <label htmlFor="passwordCheck"><span className='InputStarSpan'>*</span> 비밀번호 확인</label>
              <input className='RegisterInput' type={passwordCheckVisible ? "text" : "password"} id='passwordCheck' name="passwordCheck" value={formData.passwordCheck}
                onChange={handleChange} onBlur={validatePasswordMatch} required />
              <span className="password-toggle" onClick={togglePasswordCheckVisibility}>
                <FontAwesomeIcon className='EyeSlashIcon' icon={passwordCheckVisible ? faEyeSlash : faEye} />
              </span>
            </div>

            <div className='RegisterMemberErrorArea'>
              <div className='blank_div'></div>
              {passwordCheckError && <span className='error'>{passwordCheckError}</span>}
            </div>
          </div>

          <button type="submit" className="register-button" onClick={handleSubmit}>회원 가입</button>
        </form>
      </div>
    </div >
  );
};

export default RegisterMember;